const RegulationsPage = () => {
    return (
      <div className="min-h-screen w-screen bg-background text-textPrimary p-6 mb-12">
        <h1 className="text-3xl font-semibold mb-4">📜 Regulations & Disclaimer</h1>
  
        <div className="bg-card p-4 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-2">🔹 Content Responsibility</h2>
          <p className="text-textSecondary mb-4">
            This platform <b>does not host or own any content</b>. All content, including videos, comments, and channel information, is sourced from users or external providers.
          </p>
          <ul className="list-disc list-inside text-textSecondary space-y-2">
            <li><b>Creators are solely responsible</b> for their content.</li>
            <li>We <b>do not guarantee</b> the accuracy, reliability, or legality of any content displayed.</li>
            <li>If you encounter content that violates laws or policies, please <b>report it directly</b> to the original content provider.</li>
          </ul>
        </div>
  
        <div className="bg-card p-4 rounded-lg border border-border mt-4">
          <h2 className="text-xl font-semibold mb-2">🚫 Restricted Content</h2>
          <p className="text-textSecondary mb-4">To maintain a safe and respectful space, the following <b>types of content are NOT allowed</b>:</p>
          <ul className="list-disc list-inside text-textSecondary space-y-2">
            <li>❌ <b>Illegal material</b> (violating local or international laws)</li>
            <li>❌ <b>Hate speech, discrimination, or threats</b></li>
            <li>❌ <b>Violent, abusive, or misleading content</b></li>
            <li>❌ <b>Sexually explicit or inappropriate content</b></li>
            <li>❌ <b>Unauthorized copyrighted material</b></li>
          </ul>
          <p className="text-textSecondary mt-2">
            Any violations may result in <b>content removal</b> or further action based on applicable laws.
          </p>
        </div>
  
        <div className="bg-card p-4 rounded-lg border border-border mt-4">
          <h2 className="text-xl font-semibold mb-2">🛑 Platform Liability</h2>
          <p className="text-textSecondary">
            By using this platform, you acknowledge that:
          </p>
          <ul className="list-disc list-inside text-textSecondary space-y-2 mt-2">
            <li>We <b>do not endorse or verify</b> any uploaded content.</li>
            <li>You are using the platform <b>at your own discretion and risk</b>.</li>
            <li>We are <b>not responsible</b> for any harm, loss, or disputes arising from the content or its use.</li>
          </ul>
        </div>
  
        <div className="bg-card p-4 rounded-lg border border-border mt-4">
          <h2 className="text-xl font-semibold mb-2">📢 Final Note</h2>
          <p className="text-textSecondary">
            If you believe any content violates these guidelines, please <b>report it responsibly on GitHub</b>. We strive to provide an open yet <b>safe</b> experience for all users. 🚀
          </p>
        </div>
      </div>
    );
  };
  
  export default RegulationsPage;
  