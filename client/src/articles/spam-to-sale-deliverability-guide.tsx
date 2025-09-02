export function SpamToSale() {
  return (
    <>
      <p>
        You can write the most compelling cold email in the world, but if it
        lands in the spam folder, it will never be read. Email deliverability—the
        ability to get your email into the recipient's primary inbox—is the
        unsung hero of successful cold outreach. This guide will cover the
        technical and content-related factors you need to master to ensure your
        emails get seen.
      </p>

      <h2>The Technical Foundation: Your Sending Reputation</h2>
      <p>
        Before you even write a single email, you need to set up your domain for
        success. Internet Service Providers (ISPs) like Google and Microsoft
        use these records to verify that you are a legitimate sender.
      </p>
      <ul>
        <li>
          <strong>SPF (Sender Policy Framework):</strong> This is a DNS record
          that lists the mail servers authorized to send email on behalf of your
          domain.
        </li>
        <li>
          <strong>DKIM (DomainKeys Identified Mail):</strong> This adds a digital
          signature to your emails, allowing the receiving server to verify
          that the email was actually sent by you and hasn't been tampered with.
        </li>
        <li>
          <strong>DMARC (Domain-based Message Authentication, Reporting, and
          Conformance):</strong> This builds on SPF and DKIM, telling receiving
          servers what to do with emails that fail authentication (e.g., reject
          them or send them to spam).
        </li>
      </ul>
      <p>
        Setting these up is essential. Use a tool like MXToolbox to check your
        domain's records.
      </p>

      <h2>Warming Up Your Email Account</h2>
      <p>
        If you start sending hundreds of emails from a brand-new email account,
        ISPs will immediately flag you as a potential spammer. You need to "warm
        up" your account by gradually increasing your sending volume over
        several weeks.
      </p>
      <ul>
        <li><strong>Week 1:</strong> 10-20 emails per day.</li>
        <li><strong>Week 2:</strong> 20-40 emails per day.</li>
        <li><strong>Week 3:</strong> 40-80 emails per day.</li>
        <li><strong>Week 4 onwards:</strong> Slowly increase to your desired volume.</li>
      </ul>
      <p>
        During this period, focus on sending to highly engaged contacts to
        generate positive signals (opens and replies).
      </p>

      <h2>Content That Avoids the Spam Filter</h2>
      <p>
        What you write is just as important as how you send it. Spam filters
        are sophisticated and analyze the content of your emails for red flags.
      </p>
      <ul>
        <li>
          <strong>Avoid Spam Trigger Words:</strong> Words like "free," "sale,"
          "guarantee," "act now," and excessive use of exclamation points can
          trigger filters.
        </li>
        <li>
          <strong>Limit Links and Images:</strong> An email with too many links
          or large images is a classic spam signal. Aim for no more than 1-2
          links in your initial email.
        </li>
        <li>
          <strong>Maintain a Good Text-to-HTML Ratio:</strong> Avoid overly
          designed, image-heavy emails. Your email should look like it was sent
          from a person, not a marketing machine.
        </li>
        <li>
          <strong>Include a Clear Unsubscribe Link:</strong> While it might seem
          counterintuitive for cold emails, providing an easy way to opt out is
          required by laws like CAN-SPAM and is a positive signal to ISPs. It's
          better to get an unsubscribe than a spam complaint.
        </li>
      </ul>
      <p>
        By combining a strong technical foundation with thoughtful content, you
        can build a positive sending reputation and ensure your carefully
        crafted messages land where they belong: in front of your prospects.
      </p>
    </>
  );
}
