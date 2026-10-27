// יוצר משתמשי הדגמה ונתונים לדוגמה בשרת שבאוויר, דרך ה-API (לא מוחק כלום).
// הרצה: node demo-data.mjs   (אפשר להעביר כתובת שרת אחרת: node demo-data.mjs http://localhost:3000)
const BASE = (process.argv[2] ?? 'https://yachad-backend-0y9k.onrender.com').replace(/\/$/, '') + '/api';
const PASSWORD = 'Demo1234!';

const call = async (method, path, token, body) => {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${data?.error?.message ?? ''}`);
  return data;
};

const user = async (fullName, email, phone) => {
  try {
    return (await call('POST', '/auth/register', null, { fullName, email, phone, password: PASSWORD })).token;
  } catch {
    return (await call('POST', '/auth/login', null, { email, password: PASSWORD })).token;
  }
};

const day = (n, hour = 19) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

const acceptInvitation = async (token, eventId) => {
  const { invitations } = await call('GET', '/invitations/me', token);
  const inv = invitations.find((i) => i.event.id === eventId);
  await call('POST', `/invitations/${inv.id}/accept`, token);
};

const addTask = async (token, eventId, description) =>
  (await call('POST', `/events/${eventId}/tasks`, token, { description })).task.id;

const addExpense = (token, eventId, amount, reason) =>
  call('POST', `/events/${eventId}/expenses`, token, { amount, reason });

const main = async () => {
  console.log('מתחבר לשרת (בפעם הראשונה זה יכול לקחת עד דקה)...');
  await fetch(BASE + '/health');

  const rachel = await user('רחל לוי', 'rachel.demo@example.com', '0521110001');
  const sara = await user('שרה כהן', 'sara.demo@example.com', '0521110002');
  await user('דנה פרידמן', 'dana.demo@example.com', '0521110003');

  const existing = await call('GET', '/events', rachel);
  if (existing.count > 0) {
    console.log('לנתוני ההדגמה כבר יש מפגשים, לא נוצר שום דבר חדש.');
    return;
  }

  // 1. ארוחת שבת – בתכנון, סקר פתוח, תפקידים והוצאות, הזמנה ממתינה לדנה
  const meal = (await call('POST', '/events', rachel, {
    title: 'ארוחת שבת משפחתית',
    description: 'ארוחה משותפת לכל המשפחה, כל אחד מביא משהו קטן.',
    eventDate: day(5),
    location: 'אצל סבא וסבתא',
    category: 'FAMILY',
    activityType: 'MEAL',
    budget: 1200,
    invitees: [{ email: 'sara.demo@example.com' }, { email: 'dana.demo@example.com' }],
    questions: [
      { text: 'מה נאכל?', options: ['בשרי', 'חלבי'] },
      { text: 'איזה ערב מתאים?', options: ['חמישי', 'מוצאי שבת'] },
    ],
  })).event.id;
  await acceptInvitation(sara, meal);
  const survey = await call('GET', `/events/${meal}/survey`, sara);
  await call('PUT', `/events/${meal}/survey/answers`, sara, {
    answers: survey.questions.map((q) => ({ questionId: q.id, optionIds: [q.options[0].id] })),
    note: 'אשמח לעזור בבישול',
  });
  const drinks = await addTask(rachel, meal, 'להביא שתייה');
  const salads = await addTask(rachel, meal, 'להכין סלטים');
  await addTask(rachel, meal, 'להביא כלים חד פעמיים');
  await call('POST', `/events/${meal}/tasks/${drinks}/claim`, sara);
  await call('POST', `/events/${meal}/tasks/${salads}/claim`, rachel);
  await addExpense(rachel, meal, 320, 'בשר ועוף');
  await addExpense(sara, meal, 150, 'שתייה');

  // 2. טיול – נקבע, עם התחשבנות מחושבת
  const trip = (await call('POST', '/events', rachel, {
    title: 'טיול שנתי לכנרת',
    description: 'יום כיף בחוף, יציאה בבוקר וחזרה לפני השקיעה.',
    eventDate: day(14, 8),
    location: 'חוף גינוסר',
    category: 'FRIENDS',
    activityType: 'TRIP',
    budget: 2000,
    invitees: [{ email: 'sara.demo@example.com' }],
  })).event.id;
  await acceptInvitation(sara, trip);
  await call('PUT', `/events/${trip}`, rachel, { status: 'SCHEDULED' });
  const bus = await addTask(rachel, trip, 'להזמין הסעה');
  await call('POST', `/events/${trip}/tasks/${bus}/claim`, rachel);
  await addTask(rachel, trip, 'להביא ציוד עזרה ראשונה');
  await addExpense(rachel, trip, 600, 'הסעה');
  await addExpense(sara, trip, 240, 'ציוד וכיבוד');
  await call('POST', `/events/${trip}/settlement/calculate`, rachel);

  // 3. יום הולדת שכבר התקיים – הסתיים
  const birthday = (await call('POST', '/events', rachel, {
    title: 'מסיבת יום הולדת לנועה',
    eventDate: day(3),
    location: 'בגן השכונתי',
    category: 'FAMILY',
    activityType: 'BIRTHDAY',
    budget: 500,
    invitees: [{ email: 'sara.demo@example.com' }],
  })).event.id;
  await acceptInvitation(sara, birthday);
  await addExpense(rachel, birthday, 180, 'עוגה ובלונים');
  await addExpense(sara, birthday, 90, 'מתנה');
  await call('POST', `/events/${birthday}/settlement/calculate`, rachel);
  await call('PUT', `/events/${birthday}`, rachel, { eventDate: day(-10), status: 'COMPLETED' });

  // 4. שרה מארגנת – רחל קיבלה הזמנה שעוד לא ענתה עליה
  await call('POST', '/events', sara, {
    title: 'ערב כיבוד לכיתה',
    location: 'אולם הקהילה',
    category: 'CLASS_COMMUNITY',
    activityType: 'REFRESHMENT',
    invitees: [{ email: 'rachel.demo@example.com' }],
  });

  console.log('נתוני ההדגמה נוצרו בהצלחה.');
};

main().catch((e) => {
  console.error('שגיאה:', e.message);
  process.exit(1);
});
