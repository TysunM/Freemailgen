export function CaseStudy() {
    return (
        <>
            <p>An open rate of 60% on a cold email campaign might sound impossible, but with the right strategy, it's achievable. We recently ran a hyper-targeted campaign for a B2B SaaS client in the cybersecurity space, and the results were phenomenal. This case study breaks down the exact methodology we used, step by step, so you can replicate its success.</p>

            <h2>The Client and The Goal</h2>
            <p>Our client provides a niche cybersecurity solution for mid-market e-commerce companies that use the Magento platform. Their goal was to book meetings with CTOs and Heads of IT.</p>
            <p><strong>The Goal:</strong> Book 10 qualified meetings in one month.</p>
            <p><strong>The Challenge:</strong> CTOs are notoriously busy and skeptical of cold outreach, especially regarding security.</p>

            <h2>Step 1: The Hyper-Targeted Prospect List</h2>
            <p>Instead of a broad approach, we built a small, high-quality list. We didn't want thousands of prospects; we wanted 100 perfect ones.</p>
            <ul>
                <li><strong>Tool Used:</strong> LinkedIn Sales Navigator and BuiltWith.</li>
                <li><strong>Criteria:</strong> We first used BuiltWith to identify all e-commerce sites using Magento with an estimated annual revenue between $10M and $100M. Then, we used Sales Navigator to find the CTO, VP of Engineering, or Head of IT at those specific companies.</li>
                <li><strong>Result:</strong> A list of 124 highly qualified individuals. We manually verified each one to ensure they were the right contact.</li>
            </ul>

            <h2>Step 2: The "Triple-Threat" Personalization</h2>
            <p>For each prospect, we researched three key personalization points:</p>
            <ol>
                <li><strong>A Recent Company Signal:</strong> A new product launch, a recent funding announcement, or an article featuring the company.</li>
                <li><strong>A Personal LinkedIn Signal:</strong> An article they recently shared, a comment they made, or a recent job change.</li>
                <li><strong>A Technical Signal:</strong> We noted they were using Magento and often another specific tool from their tech stack.</li>
            </ol>
            <p>This research took time—about 5-7 minutes per prospect—but it was the cornerstone of the campaign's success.</p>

            <h2>Step 3: The Email That Got Opened</h2>
            <p>We crafted an email that was impossible to ignore because it was so clearly not a generic template.</p>
            <p><strong>Subject Line A/B Test:</strong></p>
            <ul>
                <li><strong>A:</strong> Question about [Their Company]'s Magento security</li>
                <li><strong>B:</strong> [Mutual Connection's Name]</li>
            </ul>
            <p>Interestingly, Subject Line A, the more specific one, won with a 62% open rate compared to 58% for the referral line.</p>

            <h3>The Winning Email Body:</h3>
            <p>
                `Hi {{firstName}},`
                <br /><br />
                `{{PersonalizedOpeningLine}}` (e.g., "I just read your recent post on the challenges of scaling your engineering team - great insights.")
                <br /><br />
                `Given your focus on [Recent Company Signal], I imagine that ensuring the security of your Magento platform is a top priority.`
                <br /><br />
                `We help CTOs at Magento-based e-commerce companies like yours to automate vulnerability patching, saving their teams an average of 20 hours per month on manual security updates.`
                <br /><br />
                `Is this something you've allocated resources to for Q4?`
            </p>

            <h2>The Results</h2>
            <ul>
                <li><strong>Emails Sent:</strong> 124</li>
                <li><strong>Open Rate:</strong> 62.1%</li>
                <li><strong>Reply Rate:</strong> 18.5%</li>
                <li><strong>Positive Reply Rate:</strong> 11.3%</li>
                <li><strong>Meetings Booked:</strong> 14</li>
            </ul>
            <p>This case study proves that when it comes to cold email, quality trumps quantity every time. A deep investment in research and personalization allowed us to not only meet but exceed the client's goal, turning cold outreach into a predictable pipeline of high-value leads.</p>
        </>
    );
}
