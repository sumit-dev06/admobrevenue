import React, { useState } from "react";
import { useTranslation } from "../i18n/LanguageContext";
import { Mail, Shield, FileText, Info, HelpCircle, Send, CheckCircle2 } from "lucide-react";

const pageWrapperClasses = "max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-neutral-800 dark:text-neutral-300 font-mono text-xs sm:text-sm leading-relaxed space-y-6";
const cardClasses = "bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-6";
const h1Classes = "text-xl sm:text-2xl font-black text-neutral-950 dark:text-white flex items-center gap-2 border-b border-dashed border-neutral-300 dark:border-neutral-800 pb-4";
const h2Classes = "text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mt-6 mb-2 uppercase";
const linkClasses = "text-blue-600 dark:text-blue-400 hover:underline";
const listClasses = "list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-400";

export const AboutPage = React.memo(() => {
  const { t } = useTranslation();

  return (
    <div className={pageWrapperClasses}>
      <div className={cardClasses}>
        <h1 className={h1Classes}>
          <Info className="w-5 h-5 text-blue-500" aria-hidden="true" />
          {t.trust.aboutTitle}
        </h1>
        
        <p>{t.trust.aboutP1}</p>

        <h2 className={h2Classes}>{t.trust.aboutWhyTitle}</h2>
        <p>{t.trust.aboutWhyDesc}</p>

        <h2 className={h2Classes}>{t.trust.aboutMethodTitle}</h2>
        <ul className={listClasses}>
          <li>{t.trust.aboutMethod1}</li>
          <li>{t.trust.aboutMethod2}</li>
          <li>{t.trust.aboutMethod3}</li>
          <li>{t.trust.aboutMethod4}</li>
        </ul>
      </div>
    </div>
  );
});

export const ContactPage = React.memo(() => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className={pageWrapperClasses}>
      <div className={cardClasses}>
        <h1 className={h1Classes}>
          <Mail className="w-5 h-5 text-emerald-500" aria-hidden="true" />
          {t.trust.contactTitle}
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400">
          {t.trust.contactDesc}
        </p>

        {submitted ? (
          <div className="p-6 rounded-xl border border-dashed border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              {t.trust.contactSuccessTitle}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {t.trust.contactSuccessDesc}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage("");
              }}
              className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono font-bold rounded-lg border border-dashed border-neutral-700 cursor-pointer"
            >
              {t.trust.contactSendAnother}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="contact-name" className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase">
                  {t.trust.contactName}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-emerald-500 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-email" className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase">
                  {t.trust.contactEmail}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="publisher@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-emerald-500 text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-subject" className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase">
                {t.trust.contactTopic}
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-emerald-500 text-neutral-900 dark:text-white cursor-pointer"
              >
                <option value="general">General Support</option>
                <option value="feedback">Calculator Feedback</option>
                <option value="data">Benchmark Data Update</option>
                <option value="partnership">Partnership</option>
                <option value="bug">Report Bug</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-msg" className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase">
                {t.trust.contactMsg}
              </label>
              <textarea
                id="contact-msg"
                required
                rows={5}
                placeholder="..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-emerald-500 text-neutral-900 dark:text-white resize-y"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] text-neutral-500">
                Direct: <span className="font-bold text-neutral-700 dark:text-neutral-300">support@admobrevenue.pages.dev</span>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono font-bold rounded-xl border border-dashed border-neutral-700 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.trust.contactSubmit}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
});

export const PrivacyPage = React.memo(() => {
  const { t } = useTranslation();

  return (
    <div className={pageWrapperClasses}>
      <div className={cardClasses}>
        <h1 className={h1Classes}>
          <Shield className="w-5 h-5 text-purple-500" aria-hidden="true" />
          {t.trust.privacyTitle}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">{t.trust.privacyDate}</p>
        <p>{t.trust.privacyIntro}</p>
      </div>
    </div>
  );
});

export const TermsPage = React.memo(() => {
  const { t } = useTranslation();

  return (
    <div className={pageWrapperClasses}>
      <div className={cardClasses}>
        <h1 className={h1Classes}>
          <FileText className="w-5 h-5 text-amber-500" aria-hidden="true" />
          {t.trust.termsTitle}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">{t.trust.termsDate}</p>
        <p>{t.trust.termsIntro}</p>
      </div>
    </div>
  );
});

export const DisclaimerPage = React.memo(() => {
  const { t } = useTranslation();

  return (
    <div className={pageWrapperClasses}>
      <div className={cardClasses}>
        <h1 className={h1Classes}>
          <HelpCircle className="w-5 h-5 text-rose-500" aria-hidden="true" />
          {t.trust.disclaimerTitle}
        </h1>
        <p>{t.trust.disclaimerIntro}</p>
        <h2 className={h2Classes}>{t.trust.trademarkTitle}</h2>
        <p>{t.trust.trademarkDesc}</p>
      </div>
    </div>
  );
});
