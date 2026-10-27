import { Link } from "react-router-dom"

const LandingPage = () => {
    return <>
    <div className="landing-top">
        <Link className="btn btn-outline landing-login" to="/login">התחברות</Link>
        <Link className="btn btn-primary" to="/register">הרשמה בחינם</Link>
    </div>
        <div className="landing-hero">
            <div className="landing-text">
                <span className="landing-eyebrow">משפחה · כיתה · חברים · עבודה</span>
                <h1 className="landing-title">כל המפגש במקום אחד.</h1>
                <p className="landing-lead">מזמינים, שואלים מתי ואיפה נוח, מחלקים מי מביא מה – ובסוף יודעים בדיוק מי מעביר כמה ולמי. בלי עשרות הודעות בקבוצה.</p>
                <div className="landing-actions">
                    <Link className="btn btn-accent btn-lg landing-cta" to="/register">לפתוח מפגש ראשון</Link>
                    <a className="btn btn-outline btn-lg" href="#how">איך זה עובד </a>
                </div>
            </div>
            <div className="landing-demo">
                <div className="landing-demo-label">כך זה נראה · לדוגמה</div>
                <div className="landing-demo-card landing-demo-event">
                    <span className="landing-demo-date"><span>23</span>אוקט'</span>
                    <h6 className="landing-demo-title">ארוחת חנוכה משפחתית</h6>
                    <div className="landing-demo-tags">
                        <span className="tag tag-accepted">14 מגיעים</span>
                        <span className="tag tag-pending">3 עוד לא ענו</span>
                    </div>
                </div>
                <div className="landing-demo-card landing-demo-task">
                    <p className="landing-demo-kicker">תפקיד פנוי</p>
                    <h6 className="landing-demo-title">לקנות חד פעמי</h6>
                    <span className="landing-demo-btn">עלי!</span>
                </div>
                <div className="landing-demo-card landing-demo-settle">
                    <span className="landing-demo-icon"></span>
                    <div className="landing-demo-title">התחשבנות מוכנה</div>
                    <p className="landing-demo-sub">דנה מעבירה לרחל 135 ₪</p>
                </div>
                <p className="landing-demo-note">הנתונים להמחשה בלבד</p>
            </div>
        </div>

        <div className="landing-how" id="how">
            <h2 className="landing-how-title">ארבעה צעדים, ואף אחד לא נשאר מחוץ לתמונה</h2>
            <div className="landing-step">
                <h2 className="landing-step-num">1</h2>
                <h4 className="landing-step-title">מזמינים</h4>
                <p>מייל או טלפון – גם מי שעוד לא רשום יראה את ההזמנה ברגע שיירשם.</p>
            </div>
            <div className="landing-step">
                <h2 className="landing-step-num">2</h2>
                <h4 className="landing-step-title">שואלים</h4>
                <p>סקר קצר: מתי, איפה, מה אוכלים. רואים מיד מה הרוב מעדיף.</p>
            </div>
            <div className="landing-step">
                <h2 className="landing-step-num">3</h2>
                <h4 className="landing-step-title">מתחלקים</h4>
                <p>רשימת תפקידים – כל אחד לוקח מה שמתאים לו, וכולם רואים מי אחראי על מה.</p>
            </div>
            <div className="landing-step">
                <h2 className="landing-step-num">4</h2>
                <h4 className="landing-step-title">מתחשבנים</h4>
                <p>כל אחד רושם מה שילם. לחיצה אחת – ויודעים מי מעביר כמה ולמי.</p>
            </div>
        </div>

        <div className="landing-cta-box">
            <div className="landing-cta-text">
                <h1 className="landing-cta-title">המפגש הבא שלכם מתחיל כאן</h1>
                <p>פותחים חשבון בחינם, ומזמינים את כולם תוך דקה.</p>
            </div>
            <Link className="btn btn-accent btn-lg" to="/register">יוצאים לדרך</Link>
        </div>
    </>
}

export default LandingPage