---
title: 0. AI Security Overview
weight: 1
toc: true
---

<!-- {{< hero-section
  title="AI Security Overview"
  subtitle="This section provides various overviews of threats and control, step-by-step risk analysis, and discussion of cross-cutting concerns."
>}} -->

<section class="bg-white  rounded-2xl p-8 my-7">

## About the AI Exchange

  <!-- Paragraph -->
  <p class="text-gray-700 text-[16px] leading-relaxed mb-6">
    The OWASP AI Exchange has open sourced the global discussion on the security of AI and data-centric systems. 
    It is an open collaborative project to advance the development of AI security standards and regulations, 
    by providing a comprehensive overview of AI threats, controls and security best practices. 
    This content is feeding into standards for the EU AI Act, ISO/IEC 27090 (AI security), the OWASP ML top 10, 
    the OWASP LLM top 10, and OpenCRE - which we want to use to provide the AI Exchange content through 
    the security chatbot OpenCRE-Chat.
  </p>
  <!-- Category & Permalink -->
    <p><strong>Category:</strong> discussion</p>
    <p>
      <strong>Permalink:</strong> 
      <a href="https://owaspai.org/goto/about/" class="text-blue-600 hover:underline">
        https://owaspai.org/goto/about/
      </a>
    </p>
  
  <!-- Video Thumbnail -->

  <a href="https://youtu.be/kQC7ouDB_z8" target="_blank" rel="noopener noreferrer" class="w-full max-w-4xl">
    <img
  src="/images/ai-verview.png"
  alt="AI Exchange Video"
  class="w-full h-[270px] object-cover rounded-lg shadow-sm border border-gray-300 hover:scale-105 transition-transform"
/>

  </a>

<!-- Paragraph under image -->
<p class="text-gray-700 text-[16px] leading-relaxed max-w-4xl mx-auto px-5 mb-6">
  Data-centric systems can be divided into AI systems and ‘big data’ systems that don’t have an AI model (e.g. data warehousing, BI, reporting, big data) 
  to which many of the threats and controls in the AI Exchange are relevant: data poisoning, data supply chain management, data pipeline security, etc.
</p>
<p class="text-gray-700 text-[16px] leading-relaxed max-w-4xl mx-auto px-5 mb-6">
  The AI Exchange is displayed here at owaspai.org and edited using a GitHub repository (see the links Edit on Github). It is is an open-source living publication for the worldwide exchange of AI security expertise, and part of the OWASP AI security & privacy guide project. It is structured as one coherent resource consisting of several sections under ‘content’, each represented by a page on this website.
</p>

<p class="text-gray-700 text-[16px] leading-relaxed max-w-4xl mx-auto px-5 mb-6">
 OWASP AI Exchange by The AI security community is marked with CC0 1.0 meaning you can use any part freely without copyright and without attribution. If possible, it would be nice if the OWASP AI Exchange is credited and/or linked to, for readers to find more information.
</p>
<p class="text-gray-700 text-[16px] leading-relaxed max-w-4xl mx-auto px-5 mb-6">
 The AI Exchange was founded by Rob van der Veer - bridge builder for security standards, Chief AI Officer at Software Improvement Group, with 33 years of experience in AI & security, lead author of ISO/IEC 5338 on AI lifecycle, founding father of OpenCRE, and currently working on security requirements in ISO/IEC 27090 and the EU AI act in CEN/CENELEC.
</p>
<p class="text-gray-700 text-[16px] leading-relaxed max-w-4xl mx-auto px-5 mb-6">
 This material is evolving constantly through open source continuous delivery. The authors group consists of 65 experts (researchers, practitioners, vendors, data scientists, etc.) and other people in the community are welcome to provide input too. See the contribute page.
</p>

### How it works

  <p class="text-gray-700 leading-relaxed mb-4">
    The AI Exchange is displayed here at
    <a href="https://owaspai.org" class="text-blue-600 hover:underline">owaspai.org</a> and edited using a
    <a
      href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/tree/main/content/ai_exchange/content"
      class="text-blue-600 hover:underline"
      >GitHub repository</a
    >
    (see the links <em>Edit on Github</em>). It is an <strong>open-source living publication</strong> for the worldwide
    exchange of AI security &amp; privacy expertise. It is structured as one coherent resource consisting of several
    sections under “content”, each represented by a page on this website.
  </p>

  <p class="text-gray-700 leading-relaxed mb-4">
    This material is evolving constantly through open-source continuous delivery. The authors group consists of over 70
    carefully selected experts (researchers, practitioners, vendors, data scientists, etc.) and other people in the
    community are welcome to provide input too. See the
    <a href="/contribute" class="text-blue-600 hover:underline">contribute page</a>.
  </p>
    <p>
      <a href="https://owaspai.org" class="text-blue-600 hover:underline">OWASP AI Exchange</a> by
      <span class="font-medium">The AI security community</span> is marked with
      <a
        href="http://creativecommons.org/publicdomain/zero/1.0?ref=chooser-v1"
        target="_blank"
        rel="license noopener noreferrer"
        class="text-blue-600 hover:underline"
        >CC0 1.0</a
      >
      meaning you can use any part freely without copyright and without attribution. If possible, please credit or link
      back to the OWASP AI Exchange so readers can find more information.
    </p>


### History

  <p class="text-gray-700 leading-relaxed mb-4">
    The AI Exchange was founded in 2022 by
    <a href="https://www.linkedin.com/in/robvanderveer/" class="text-blue-600 hover:underline">Rob van der Veer</a> –
    bridge builder for security standards, Chief AI Officer at
    <a href="https://www.softwareimprovementgroup.com" class="text-blue-600 hover:underline"
      >Software Improvement Group</a
    >, with 33 years of experience in AI &amp; security, lead author of ISO/IEC 5338 on AI lifecycle, founding father of
    OpenCRE, and currently working in ISO/IEC 27090, ISO/IEC 27091 and the EU AI Act in CEN/CENELEC, where he was
    elected co-editor by the EU member states.
  </p>

  <p class="text-gray-700 leading-relaxed">
    The project started out as the “AI Security and Privacy Guide” in October 2022 and was rebranded a year later as “AI
    Exchange” to highlight the element of global collaboration. In March 2025 the AI Exchange was awarded the status of
    “OWASP Flagship Project” because of its critical importance, together with the
    <a href="https://genai.owasp.org/" class="text-blue-600 hover:underline">GenAI Security Project</a>.
  </p>
</section>

## Relevant OWASP AI initiatives

<section class="max-w-6xl mx-auto p-6 space-y-2">
  <!-- Category & Permalink -->
    <p><strong>Category:</strong> discussion</p>
    <p>
      <strong>Permalink:</strong> 
      <a href="https://owaspai.org/goto/about/" class="text-blue-600 hover:underline">
        https://owaspai.org/goto/about/
      </a>
    </p>
   <img
  src="/images/overview1.png"
  alt="AI Exchange Video"
  class="w-full h-[270px] object-cover rounded-lg shadow-sm border border-gray-300 hover:scale-105 transition-transform"
/>

  <p class="mb-4">
      In short, the two flagship OWASP AI projects:
    </p>
    <ul class="list-disc list-inside space-y-2 mb-4">
      <li>
        <strong>OWASP AI Exchange:</strong> A comprehensive core framework of threats, controls and related best practices for all AI, actively aligned with international standards and feeding into them. Covers all types of AI and addresses both security and privacy.
      </li>
      <li>
        <strong>OWASP GenAI Security Project:</strong> A growing collection of documents on Generative AI security, including the LLM top 10.
      </li>
    </ul>
    <p class="mb-2">
      Here's more information on AI at OWASP:
    </p>
    <ul class="list-disc list-inside space-y-2">
      <li>To <strong>ensure security or privacy</strong> of your AI or data-centric system, use the <a href="https://owaspai.org" class="text-blue-600 underline">AI Exchange</a>.</li>
      <li>For a <strong>quick overview</strong> of key security concerns for Large Language Models, check the <a href="https://genai.owasp.org/llm-top-10/" class="text-blue-600 underline">LLM top 10</a>.</li>
      <li>For any specific topic around Generative AI security, check the <a href="https://genai.owasp.org/" class="text-blue-600 underline">GenAI Security Project</a> or the <a href="/goto/references/" class="text-blue-600 underline">AI Exchange references</a>.</li>
    </ul>

## Summary - How to address AI Security

   <p class="mb-4">
     While AI offers tremendous opportunities, it also brings new risks including security threats. The main steps to address AI security are:
    </p>
    <ul class="list-disc list-inside space-y-2 mb-4">
      <li>Implement <strong>AI governance</strong>.</li>
      <li>Extend your security practices with the AI security assets, threats, and controls from this document.</li>
      <li>
        If you develop AI systems:
        <ul class="list-decimal list-inside ml-5 mt-2 space-y-1">
          <li>Integrate AI engineering into traditional <strong>(secure) software development practices</strong>.</li>
          <li>Apply process and technical <strong>controls</strong> understanding relevant threats.</li>
        </ul>
      </li>
      <li>Ensure AI <strong>suppliers</strong> apply the appropriate controls.</li>
      <li>Limit AI impact by minimizing data and privileges, adding oversight, e.g., guardrails and human oversight.</li>
    </ul>
    <p>
      An AI system can be a Large Language Model, linear regression, rule-based system, or a lookup table. This document clarifies when which threats and controls apply.
    </p>

## How to use this Document

### Ways to start

  <p class="mb-4">
      The AI Exchange is a coherent resource on how to protect AI systems, divided over several pages.
    </p>
    <ul class="list-disc list-inside space-y-2 mb-4">
      <li>If you want to <strong>protect your AI system</strong>, start with <a href="/goto/riskanalysis/" class="text-blue-600 underline">risk analysis</a>.</li>
      <li>For an overview of <strong>attacks</strong>, check the <a href="/goto/threatsoverview/" class="text-blue-600 underline">AI threat model</a> or <a href="/goto/aisecuritymatrix" class="text-blue-600 underline">AI security matrix</a>.</li>
      <li>To understand how <strong>controls</strong> link to attacks, check the <a href="/goto/controlsoverview/" class="text-blue-600 underline">controls overview</a> or <a href="/goto/periodictable/" class="text-blue-600 underline">periodic table</a>.</li>
      <li>To <strong>test</strong> AI security with tools, see the <a href="/goto/testing/" class="text-blue-600 underline">testing page</a>.</li>
      <li>To learn about AI <strong>privacy</strong>, see the <a href="/goto/aiprivacy/" class="text-blue-600 underline">privacy section</a>.</li>
      <li>For more information or training, see the <a href="/goto/references/" class="text-blue-600 underline">references</a>.</li>
    </ul>
    <p>
      Structure in brief:
    </p>
    <ol class="list-decimal list-inside space-y-1">
      <li>AI security overview</li>
      <li>General controls (AI governance)</li>
      <li>Threats through use (evasion attacks)</li>
      <li>Development-time threats (data poisoning)</li>
      <li>Runtime security threats (insecure output)</li>
      <li>AI security testing</li>
      <li>AI privacy</li>
      <li>References</li>
    </ol>

## Threats overview

  <p class="mb-4">We distinguish three types of threats:</p>
    <ul class="list-disc list-inside space-y-2 mb-4">
      <li>During development-time (data preparation and model training)</li>
      <li>Through using the model (input/output)</li>
      <li>By attacking the system during runtime (production)</li>
    </ul>
    <p class="mb-4">
      We outline six types of impacts aligned with attacker goals (disclose, deceive, disrupt):
    </p>
    <ul class="list-disc list-inside space-y-2 mb-4">
      <li>Disclose: hurt confidentiality of train/test data</li>
      <li>Disclose: hurt confidentiality of model IP</li>
      <li>Disclose: hurt confidentiality of input data</li>
      <li>Deceive: hurt integrity of model behaviour</li>
      <li>Disrupt: hurt availability of the model</li>
      <li>Disrupt/disclose: impact on non AI-specific assets</li>
    </ul>
    <p>
      Example: Membership inference attacks can reveal whether a specific individual was in the training data.
    </p>
      <img src="/images/threats.png" alt="Threat diagram" class="w-full rounded shadow-lg">


</section>

<section class="max-w-4xl mx-auto p-6 space-y-6">

  <!-- Agentic AI Intro -->

## How about Agentic AI?

  <p class="mb-4">
      Think of Agentic AI as voice assistants that can control your heating, send emails, and even invite more assistants into the conversation. That’s powerful—but you’d probably want it to check with you first before sending a thousand emails.
    </p>

  <p class="font-semibold mb-2">There are four key aspects to understand:</p>
<ol class="list-decimal list-outside mb-4 pl-5">
  <li><strong>Action:</strong> Agents don’t just chat — they invoke functions such as sending an email.</li>
  <li><strong>Autonomous:</strong> Agents can trigger each other, enabling autonomous responses (e.g., a script receives an email, triggering a GenAI follow-up).</li>
  <li><strong>Complex:</strong> Agentic behaviour is emergent.</li>
  <li><strong>Multi-system:</strong> You often work with a mix of systems and interfaces.</li>
</ol>

  <!-- Security Implications -->

  <p class="font-semibold mb-2">What does this mean for security?</p>
    <ul class="list-disc list-inside space-y-2 mb-4">
      <li>Hallucinations and prompt injections can change commands — or even escalate privileges. Don’t give GenAI models/agents direct access control; build that into your architecture.</li>
      <li>The attack surface is wide, and the potential impact should not be underestimated.</li>
      <li>Because of that, the known controls become even more important — such as traceability, protecting memory integrity, prompt injection defenses, rule-based guardrails, least model privilege, and human oversight. See the <a href="/goto/controlsoverview/" class="text-blue-600 underline">controls overview section</a>.</li>
    </ul>


  <!-- References -->

  <p>
      For more details on Agentic AI threats, see the <a href="https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/" class="text-blue-600 underline">Agentic AI threats and mitigations</a> from the GenAI security project.
    </p>
    <p>
      For a more general discussion of Agentic AI, see <a href="https://huyenchip.com/2025/01/07/agents.html" class="text-blue-600 underline">this article by Chip Huyen</a>.
    </p>
    <p>
      The <a href="/goto/testing/" class="text-blue-600 underline">testing section</a> discusses more about agentic AI red teaming.
    </p>


</section>

<!-- AI Security Matrix Section -->

## AI Security Matrix

<section class="mb-12">

  <p class="mb-4">The AI security matrix below (click to enlarge) shows all threats and risks, ordered by type and impact.</p>
  <a href="/images/OwaspAIsecuritymatix.png" target="_blank">
    <img src="/images/OwaspAIsecuritymatix.png" alt="AI Security Matrix" class="w-full rounded shadow-md hover:shadow-lg transition-shadow">
  </a>
</section>

<!-- Controls Overview Section -->

## Controls Overview

<section class="mb-12">
  <p class="mb-4">The below diagram puts the controls in the AI Exchange into groups and places these groups in the right lifecycle with the corresponding threats.</p>
  <a href="/images/threatscontrols.png" target="_blank">
    <img src="/images/threatscontrols.png" alt="Threat model with controls - general" class="w-full rounded shadow-md hover:shadow-lg transition-shadow mb-4">
  </a>

  <p class="mb-4">The groups of controls form a summary of how to address AI security (controls are in capitals):</p>
  <ol class="list-decimal list-inside space-y-3">
    <li>
      <strong>AI Governance:</strong> integrate AI comprehensively into your information security and software development lifecycle processes, embedding AI considerations across the entire lifecycle.
      <p class="pl-4 mt-1">([AIPROGRAM](/goto/aiprogram/), [SECPROGRAM](/goto/secprogram/), [DEVPROGRAM](/goto/devprogram/), [SECDEVPROGRAM](/goto/secdevprogram/), [CHECKCOMPLIANCE](/goto/checkcompliance/), [SECEDUCATE](/goto/seceducate/))</p>
    </li>
    <li>
      <strong>Apply conventional technical IT security controls</strong> in a risk-based manner:
      <ul class="list-disc pl-5 space-y-2 mt-1">
        <li>
          <strong>Standard controls:</strong> (e.g., 15408, ASVS, OpenCRE, ISO 27001 Annex A, NIST SP800-53)
          <p class="pl-4 mt-1">
            Development-time: ([DEVSECURITY](/goto/devsecurity/), [SEGREGATEDATA](/goto/segregatedata/), [SUPPLYCHAINMANAGE](/goto/supplychainmanage/), [DISCRETE](/goto/discrete/))<br>
            Runtime: ([RUNTIMEMODELINTEGRITY](/goto/runtimemodelintegrity/), [RUNTIMEMODELIOINTEGRITY](/goto/runtimemodeliointegrity/), [RUNTIMEMODELCONFIDENTIALITY](/goto/runtimemodelconfidentiality/), [MODELINPUTCONFIDENTIALITY](/goto/modelinputconfidentiality/), [ENCODEMODELOUTPUT](/goto/encodemodeloutput/), [LIMITRESOURCES](/goto/limitresources/))
          </p>
        </li>
        <li>
          <strong>Adapt controls:</strong> ([MONITORUSE](/goto/monitoruse/), [MODELACCESSCONTROL](/goto/modelaccesscontrol/), [RATELIMIT](/goto/ratelimit/))
        </li>
        <li>
          <strong>New IT controls:</strong> ([CONFCOMPUTE](/goto/confcompute/), [MODELOBFUSCATION](/goto/modelobfuscation/), [PROMPTINPUTVALIDATION](/goto/promptinputvalidation/), [INPUTSEGREGATION](/goto/inputsegregation/))
        </li>
      </ul>
    </li>
    <li>
      <strong>Data science security controls:</strong>
      <ul class="list-disc pl-5 space-y-2 mt-1">
        <li>Development-time: ([FEDERATEDLEARNING](/goto/federatedlearning/), [CONTINUOUSVALIDATION](/goto/continuousvalidation/), [UNWANTEDBIASTESTING](/goto/unwantedbiastesting/), [EVASIONROBUSTMODEL](/goto/evasionrobustmodel/), [POISONROBUSTMODEL](/goto/poisonrobustmodel/), [TRAINADVERSARIAL](/goto/trainadversarial/), [TRAINDATADISTORTION](/goto/traindatadistortion/), [ADVERSARIALROBUSTDISTILLATION](/goto/adversarialrobustdistillation/), [MODELENSEMBLE](/goto/modelensemble/), [MORETRAINDATA](/goto/moretraindata/), [SMALLMODEL](/goto/smallmodel/), [DATAQUALITYCONTROL](/goto/dataqualitycontrol/), [MODELALIGNMENT](/goto/modelalignment/))</li>
        <li>Runtime: ([DETECTODDINPUT](/goto/detectoddinput/), [DETECTADVERSARIALINPUT](/goto/detectadversarialinput/), [DOSINPUTVALIDATION](/goto/dosinputvalidation/), [INPUTDISTORTION](/goto/inputdistortion/), [FILTERSENSITIVEMODELOUTPUT](/goto/filtersensitivemodeloutput/), [OBSCURECONFIDENCE](/goto/obscureconfidence/))</li>
      </ul>
    </li>
    <li><strong>Minimize data:</strong> ([DATAMINIMIZE](/goto/dataminimize/), [ALLOWEDDATA](/goto/alloweddata/), [SHORTRETAIN](/goto/shortretain/), [OBFUSCATETRAININGDATA](/goto/obfuscatetrainingdata/))</li>
    <li><strong>Control behaviour impact:</strong> ([OVERSIGHT](/goto/oversight/), [LEASTMODELPRIVILEGE](/goto/leastmodelprivilege/), [AITRANSPARENCY](/goto/aitransparency/), [EXPLAINABILITY](/goto/explainability/), [CONTINUOUSVALIDATION](/goto/continuousvalidation/), [UNWANTEDBIASTESTING](/goto/unwantedbiastesting/))</li>
  </ol>
</section>

<!-- GenAI trained/fine tuned Section -->
<section class="mb-12">
   Threat model with controls - GenAI trained/fine tuned
  <p class="mb-4">Focuses on threats and controls when the organization is responsible for training or fine-tuning the model.</p>
  <a href="/images/threatscontrols-genainotready.png" target="_blank">
    <img src="/images/threatscontrols-genainotready.png" alt="GenAI trained or fine tuned" class="w-full rounded shadow-md hover:shadow-lg transition-shadow">
  </a>
</section>

<!-- GenAI as-is Section -->

## Threat model with controls - GenAI as-is

<section>

  <p class="mb-4">Focuses on threats and controls when the organization uses the model as-is, without additional training or fine-tuning. Key questions to consider:</p>
  <ul class="list-disc pl-5 space-y-2 mb-4">
    <li>How is the API protected?</li>
    <li>What is hosted within the Virtual Private Cloud (VPC)? Entire model or just API?</li>
    <li>How is key management handled?</li>
    <li>What are the data retention policies?</li>
    <li>Is logging enabled, and what is logged?</li>
    <li>Does the model send sensitive input data to third-party sources?</li>
  </ul>
  <a href="/images/threatscontrols-readymodel.png" target="_blank">
    <img src="/images/threatscontrols-readymodel.png" alt="GenAI as-is" class="w-full rounded shadow-md hover:shadow-lg transition-shadow">
  </a>
</section>

### Periodic table of AI security

> Category: discussion  
> Permalink: https://owaspai.org/goto/periodictable/

The table below, created by the OWASP AI Exchange, shows the various threats to AI and the controls you can use against them – all organized by asset, impact and attack surface, with deeplinks to comprehensive coverage here at the AI Exchange website.  
Note that [general governance controls](/goto/governancecontrols/) apply to all threats.

  <table class="min-w-full border border-gray-300 divide-y divide-gray-200">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold border">Asset & Impact</th>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold border">Attack surface with lifecycle</th>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold border">Threat/Risk category</th>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold border">Controls</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <!-- Model behaviour Integrity -->
      <tr>
        <td rowspan="7" class="px-4 py-2 border font-medium">Model behaviour Integrity</td>
        <td rowspan="3" class="px-4 py-2 border">Runtime - Model use (provide input / read output)</td>
        <td class="px-4 py-2 border"><a href="/goto/directpromptinjection/" class="text-blue-600 underline">Direct prompt injection</a></td>
        <td class="px-4 py-2 border">
          <a href="/goto/limitunwanted/" class="text-blue-600 underline">Limit unwanted behavior</a>, 
          <a href="/goto/promptinputvalidation/" class="text-blue-600 underline">Prompt input validation</a>, 
          <a href="/goto/modelalignment/" class="text-blue-600 underline">Model alignment</a>
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 border"><a href="/goto/indirectpromptinjection/" class="text-blue-600 underline">Indirect prompt injection</a></td>
        <td class="px-4 py-2 border">
          <a href="/goto/limitunwanted/" class="text-blue-600 underline">Limit unwanted behavior</a>, 
          <a href="/goto/promptinputvalidation/" class="text-blue-600 underline">Input validation</a>, 
          <a href="/goto/inputsegregation/" class="text-blue-600 underline">Input segregation</a>
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 border"><a href="/goto/evasion/" class="text-blue-600 underline">Evasion</a> (e.g. adversarial examples)</td>
        <td class="px-4 py-2 border">
          <a href="/goto/limitunwanted/" class="text-blue-600 underline">Limit unwanted behavior</a>, 
          <a href="/goto/monitoruse/" class="text-blue-600 underline">Monitor</a>, 
          <a href="/goto/ratelimit/" class="text-blue-600 underline">Rate limit</a>, 
          <a href="/goto/modelaccesscontrol/" class="text-blue-600 underline">Model access control</a> plus:<br>
          <a href="/goto/detectoddinput/" class="text-blue-600 underline">Detect odd input</a>, 
          <a href="/goto/detectadversarialinput/" class="text-blue-600 underline">Detect adversarial input</a>, 
          <a href="/goto/evasionrobustmodel/" class="text-blue-600 underline">Evasion robust model</a>, 
          <a href="/goto/trainadversarial/" class="text-blue-600 underline">Train adversarial</a>, 
          <a href="/goto/inputdistortion/" class="text-blue-600 underline">Input distortion</a>, 
          <a href="/goto/adversarialrobustdistillation/" class="text-blue-600 underline">Adversarial robust distillation</a>
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 border">Runtime - Break into deployed model</td>
        <td class="px-4 py-2 border"><a href="/goto/runtimemodelpoison/" class="text-blue-600 underline">Model poisoning runtime</a> (reprogramming)</td>
        <td class="px-4 py-2 border">
          <a href="/goto/limitunwanted/" class="text-blue-600 underline">Limit unwanted behavior</a>, 
          <a href="/goto/runtimemodelintegrity/" class="text-blue-600 underline">Runtime model integrity</a>, 
          <a href="/goto/runtimemodeliointegrity/" class="text-blue-600 underline">Runtime model input/output integrity</a>
        </td>
      </tr>
      <tr>
        <td rowspan="2" class="px-4 py-2 border">Development - Engineering environment</td>
        <td class="px-4 py-2 border"><a href="/goto/devmodelpoison/" class="text-blue-600 underline">Development-environment model poisoning</a></td>
        <td class="px-4 py-2 border">
          <a href="/goto/limitunwanted/" class="text-blue-600 underline">Limit unwanted behavior</a>, 
          <a href="/goto/devsecurity/" class="text-blue-600 underline">Development environment security</a>, 
          <a href="/goto/segregatedata/" class="text-blue-600 underline">Data segregation</a>, 
          <a href="/goto/federatedlearning/" class="text-blue-600 underline">Federated learning</a>, 
          <a href="/goto/supplychainmanage/" class="text-blue-600 underline">Supply chain management</a>, 
          <a href="/goto/modelensemble/" class="text-blue-600 underline">Model ensemble</a>
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 border"><a href="/goto/datapoison/" class="text-blue-600 underline">Data poisoning of train/finetune data</a></td>
        <td class="px-4 py-2 border">
          Same controls as above, plus:<br>
          <a href="/goto/moretraindata/" class="text-blue-600 underline">More training data</a>, 
          <a href="/goto/dataqualitycontrol/" class="text-blue-600 underline">Data quality control</a>, 
          <a href="/goto/traindatadistortion/" class="text-blue-600 underline">Train data distortion</a>, 
          <a href="/goto/poisonrobustmodel/" class="text-blue-600 underline">Poison robust model</a>, 
          <a href="/goto/trainadversarial/" class="text-blue-600 underline">Train adversarial</a>
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 border">Development - Supply chain</td>
        <td class="px-4 py-2 border"><a href="/goto/supplymodelpoison/" class="text-blue-600 underline">Supply-chain model poisoning</a></td>
        <td class="px-4 py-2 border">
          Supplier: <a href="/goto/devsecurity/" class="text-blue-600 underline">Development environment security</a>, 
          <a href="/goto/segregatedata/" class="text-blue-600 underline">Data segregation</a>, 
          <a href="/goto/federatedlearning/" class="text-blue-600 underline">Federated learning</a><br>
          Producer: <a href="/goto/supplychainmanage/" class="text-blue-600 underline">Supply chain management</a>, plus: 
          <a href="/goto/modelensemble/" class="text-blue-600 underline">Model ensemble</a>
        </td>
      </tr>
      <!-- Training data Confidentiality -->
      <tr>
        <td rowspan="3" class="px-4 py-2 border font-medium">Training data Confidentiality</td>
        <td rowspan="2" class="px-4 py-2 border">Runtime - Model use</td>
        <td class="px-4 py-2 border"><a href="/goto/disclosureuseoutput/" class="text-blue-600 underline">Data disclosure in model output</a></td>
        <td class="px-4 py-2 border">
          <a href="/goto/datalimit/" class="text-blue-600 underline">Sensitive data limitation</a> (data minimize, short retain, obfuscate training data), plus:<br>
          <a href="/goto/monitoruse/" class="text-blue-600 underline">Monitor</a>, 
          <a href="/goto/ratelimit/" class="text-blue-600 underline">Rate limit</a>, 
          <a href="/goto/modelaccesscontrol/" class="text-blue-600 underline">Model access control</a>, plus:<br>
          <a href="/goto/filtersensitivemodeloutput/" class="text-blue-600 underline">Filter sensitive model output</a>
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 border"><a href="/goto/modelinversionandmembership/" class="text-blue-600 underline">Model inversion / Membership inference</a></td>
        <td class="px-4 py-2 border">
          <a href="/goto/datalimit/" class="text-blue-600 underline">Sensitive data limitation</a>, plus:<br>
          <a href="/goto/monitoruse/" class="text-blue-600 underline">Monitor</a>, 
          <a href="/goto/ratelimit/" class="text-blue-600 underline">Rate limit</a>, 
          <a href="/goto/modelaccesscontrol/" class="text-blue-600 underline">Model access control</a>, plus:<br>
          <a href="/goto/obscureconfidence/" class="text-blue-600 underline">Obscure confidence</a>, 
          <a href="/goto/smallmodel/" class="text-blue-600 underline">Small model</a>
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 border">Development - Engineering environment</td>
        <td class="px-4 py-2 border"><a href="/goto/devdataleak/" class="text-blue-600 underline">Training data leaks</a></td>
        <td class="px-4 py-2 border">
          <a href="/goto/datalimit/" class="text-blue-600 underline">Sensitive data limitation</a>, plus:<br>
          <a href="/goto/devsecurity/" class="text-blue-600 underline">Development environment security</a>, 
          <a href="/goto/segregatedata/" class="text-blue-600 underline">Data segregation</a>, 
          <a href="/goto/federatedlearning/" class="text-blue-600 underline">Federated learning</a>
        </td>
      </tr>
      <!-- Model confidentiality -->
      <tr>
        <td rowspan="3" class="px-4 py-2 border font-medium">Model confidentiality</td>
        <td class="px-4 py-2 border">Runtime - Model use</td>
        <td class="px-4 py-2 border"><a href="/goto/modeltheftuse/" class="text-blue-600 underline">Model theft through use</a> (input-output harvesting)</td>
        <td class="px-4 py-2 border">
          <a href="/goto/monitoruse/" class="text-blue-600 underline">Monitor</a>, 
          <a href="/goto/ratelimit/" class="text-blue-600 underline">Rate limit</a>, 
          <a href="/goto/modelaccesscontrol/" class="text-blue-600 underline">Model access control</a>
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 border">Runtime - Break into deployed model</td>
        <td class="px-4 py-2 border"><a href="/goto/runtimemodeltheft/" class="text-blue-600 underline">Direct model theft runtime</a></td>
        <td class="px-4 py-2 border">
          <a href="/goto/runtimemodelconfidentiality/" class="text-blue-600 underline">Runtime model confidentiality</a>, 
          <a href="/goto/modelobfuscation/" class="text-blue-600 underline">Model obfuscation</a>
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 border">Development - Engineering environment</td>
        <td class="px-4 py-2 border"><a href="/goto/devmodelleak/" class="text-blue-600 underline">Model theft development-time</a></td>
        <td class="px-4 py-2 border">
          <a href="/goto/devsecurity/" class="text-blue-600 underline">Development environment security</a>, 
          <a href="/goto/segregatedata/" class="text-blue-600 underline">Data segregation</a>, 
          <a href="/goto/federatedlearning/" class="text-blue-600 underline">Federated learning</a>
        </td>
      </tr>
      <!-- Model behaviour Availability -->
      <tr>
        <td class="px-4 py-2 border">Model behaviour Availability</td>
        <td class="px-4 py-2 border">Model use</td>
        <td class="px-4 py-2 border"><a href="/goto/denialmodelservice/" class="text-blue-600 underline">Denial of model service</a> (model resource depletion)</td>
        <td class="px-4 py-2 border">
          <a href="/goto/monitoruse/" class="text-blue-600 underline">Monitor</a>, 
          <a href="/goto/ratelimit/" class="text-blue-600 underline">Rate limit</a>, 
          <a href="/goto/modelaccesscontrol/" class="text-blue-600 underline">Model access control</a> plus:<br>
          <a href="/goto/dosinputvalidation/" class="text-blue-600 underline">Dos input validation</a>, 
          <a href="/goto/limitresources/" class="text-blue-600 underline">Limit resources</a>
        </td>
      </tr>
      <!-- Model input data Confidentiality -->
      <tr>
        <td class="px-4 py-2 border">Model input data Confidentiality</td>
        <td class="px-4 py-2 border">Runtime - All IT</td>
        <td class="px-4 py-2 border"><a href="/goto/leakinput/" class="text-blue-600 underline">Model input leak</a></td>
        <td class="px-4 py-2 border"><a href="/goto/modelinputconfidentiality/" class="text-blue-600 underline">Model input confidentiality</a></td>
      </tr>
      <!-- Any asset, CIA -->
      <tr>
        <td class="px-4 py-2 border">Any asset, CIA</td>
        <td class="px-4 py-2 border">Runtime - All IT</td>
        <td class="px-4 py-2 border"><a href="/goto/insecureoutput/" class="text-blue-600 underline">Model output contains injection</a></td>
        <td class="px-4 py-2 border"><a href="/goto/encodemodeloutput/" class="text-blue-600 underline">Encode model output</a></td>
      </tr>
      <tr>
        <td class="px-4 py-2 border">Any asset, CIA</td>
        <td class="px-4 py-2 border">Runtime - All IT</td>
        <td class="px-4 py-2 border">Conventional runtime security attack on conventional asset</td>
        <td class="px-4 py-2 border">Conventional runtime security controls</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border">Any asset, CIA</td>
        <td class="px-4 py-2 border">Runtime - All IT</td>
        <td class="px-4 py-2 border">Conventional attack on conventional supply chain</td>
        <td class="px-4 py-2 border">Conventional supply chain management controls</td>
      </tr>
    </tbody>
  </table>

<di v class="max-w-6xl mx-auto px-6 py-8 space-y-6">

  <!-- Deep Dive Section -->

### Structure of threats and controls in the deep dive section

  <blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700">
    Category: discussion<br>
    Permalink: <a href="https://owaspai.org/goto/navigator/" class="text-blue-600 underline">https://owaspai.org/goto/navigator/</a>
  </blockquote>

  <p class="text-gray-700">
    The next big section in this document is an extensive deep dive into all the AI security threats and their controls.
    The navigator diagram below outlines the structure of the deep-dive section, illustrating the relationships between threats, controls, associated risks, and the types of controls applied.
  </p>

  <p class="font-medium">Info:</p>
    <p>Click on the image to get a PDF with clickable links.</p> 
   <a href="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf" target="_blank" rel="noopener noreferrer">
      <img src="/images/owaspaioverviewv2.png" alt="OWASP AI Overview Navigator" class="mx-auto rounded-md shadow-md hover:shadow-lg transition-shadow duration-200">
    </a>


---

## How to select relevant threats and controls? Risk analysis

  <p class="text-gray-700">
    There are quite a number of threats and controls described in this document. The relevance and severity of each threat and the appropriate controls depend on your specific use case and how AI is deployed within your environment. Determining which threats apply, to what extent, and who is responsible for implementing controls should be guided by a risk assessment based on your architecture and intended use.
  </p>

### Risk management introduction

  <p class="text-gray-700">
    Organizations classify their risks into several key areas: Strategic, Operational, Financial, Compliance, Reputation, Technology, Environmental, Social, and Governance (ESG). A threat becomes a risk when it exploits one or more vulnerabilities. AI threats can have significant impact across multiple risk domains. For example, adversarial attacks on AI systems can lead to disruptions in operations, distort financial models, and result in compliance issues. See the <a href="/goto/aisecuritymatrix/" class="text-blue-600 underline">AI security matrix</a> for an overview of AI related threats, risks and potential impact.
  </p>
  <p class="text-gray-700">
    General risk management for AI systems is typically driven by AI governance - see <a href="/goto/aiprogram/" class="text-blue-600 underline">AIPROGRAM</a> and includes both risks BY relevant AI systems and risks to those systems. Security risk assessment is typically driven by the security management system - see <a href="/goto/secprogram" class="text-blue-600 underline">SECPROGRAM</a>.
  </p>
  <p class="text-gray-700">
    Organizations often adopt a Risk Management framework, commonly based on ISO 31000 or similar standards such as ISO 23894. These frameworks guide the process of managing risks through four key steps:
  </p>

  <ol class="list-decimal list-inside space-y-2 text-gray-700">
    <li><strong>Identifying Risks:</strong> Recognizing potential risks that could impact the organization. See “Threat through use” section to identify potential risks.</li>
    <li><strong>Evaluating Risks by Estimating Likelihood and Impact:</strong> Assess probability and consequences of the risk. Often visualized as a heatmap.</li>
    <li><strong>Deciding What to Do (Risk Treatment):</strong> Choose a strategy: Risk Mitigation, Transfer, Avoidance, or Acceptance.</li>
    <li><strong>Risk Communication and Monitoring:</strong> Share risk information with stakeholders and ensure effective risk treatments are applied. Requires a Risk Register with attributes like severity, treatment plan, ownership, and status.</li>
  </ol>

### 1. Identifying Risks

  <p class="text-gray-700">
    Discovering potential risks requires technical and business assessment of applicable threats. The following sections outline methods to address each type of risk impact individually:
  </p>

  <h4 class="text-lg font-semibold mt-4">Unwanted model behaviour</h4>
  <p class="text-gray-700">
    Focus on manipulation by attackers. Other sources of unwanted behaviour include inaccuracy (hallucinations) or bias (discrimination). This is always applicable, although risk levels may sometimes be accepted.
  </p>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li>General governance controls: <a href="/goto/governancecontrols/" class="text-blue-600 underline">maintain documented inventory of AI applications</a>, ensure oversight and accountability.</li>
    <li>Controls to limit unwanted model behaviour: <a href="/goto/limitunwanted/" class="text-blue-600 underline">human oversight</a>.</li>
  </ul>

  <p class="text-gray-700 mt-2">If the model is GenAI (e.g. a Large Language Model):</p>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li>Prevent <a href="/goto/directpromptinjection/" class="text-blue-600 underline">prompt injection</a> (mostly supplier responsibility).</li>
    <li>Prevent <a href="/goto/indirectpromptinjection/" class="text-blue-600 underline">indirect prompt injection</a> (untrusted data in prompts).</li>
  </ul>

  <p class="text-gray-700 mt-2">Model training/finetuning responsibilities:</p>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li><strong>Supplier:</strong> Avoid <a href="/goto/transferlearningattack/" class="text-blue-600 underline">poisoned models</a> through supply chain management. Consider <a href="/goto/poisonrobustmodel/" class="text-blue-600 underline">post-training countermeasures</a>.</li>
    <li><strong>You:</strong> Prevent <a href="/goto/modelpoison/" class="text-blue-600 underline">development-time model poisoning</a>.</li>
  </ul>

  <p class="text-gray-700 mt-2">If using RAG:</p>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li>Prevent <a href="/goto/datapoison/" class="text-blue-600 underline">data poisoning</a> of the retrieval repository.</li>
  </ul>

  <p class="text-gray-700 mt-2">Runtime responsibilities:</p>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li><strong>Supplier:</strong> Prevent <a href="/goto/runtimemodelpoison/" class="text-blue-600 underline">runtime model poisoning</a>.</li>
    <li><strong>You:</strong> Same as above if hosting model yourself.</li>
  </ul>

  <p class="text-gray-700 mt-2">For judgement tasks (e.g. spam detection):</p>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li>Prevent <a href="/goto/evasion/" class="text-blue-600 underline">evasion attacks</a>. Risk may sometimes be acceptable depending on context and attacker motivation.</li>
  </ul>

  <h4 class="text-lg font-semibold mt-4">Leaking training data</h4>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li>If training/finetuning yourself and data is sensitive: prevent <a href="/goto/disclosureuse/" class="text-blue-600 underline">unwanted disclosure</a>, <a href="/goto/modelinversionandmembership/" class="text-blue-600 underline">model inversion & membership inference</a>, and training environment leaks.</li>
    <li>If using RAG, apply the same controls to repository data.</li>
    <li>If using external model supplier, check licenses, warranties, and contracts.</li>
  </ul>

  <h4 class="text-lg font-semibold mt-4">Model theft</h4>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li>If model is your IP, prevent <a href="/goto/modeltheftuse/" class="text-blue-600 underline">theft through use</a>, <a href="/goto/devmodelleak/" class="text-blue-600 underline">development-time theft</a>, <a href="/goto/devcodeleak/" class="text-blue-600 underline">source code leaks</a>, and <a href="/goto/runtimemodeltheft/" class="text-blue-600 underline">runtime theft</a>.</li>
  </ul>

  <h4 class="text-lg font-semibold mt-4">Leaking input data</h4>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li>Prevent <a href="/goto/leakinput/" class="text-blue-600 underline">input data leaks</a>. Ensure secure transfer and storage, especially if using a supplier or RAG.</li>
  </ul>

  <h4 class="text-lg font-semibold mt-4">Miscellaneous</h4>
  <ul class="list-disc list-inside space-y-2 text-gray-700">
    <li>If using LLM: prevent <a href="/goto/insecureoutput/" class="text-blue-600 underline">insecure output handling</a>.</li>
    <li>Prevent <a href="/denialmodelservice/" class="text-blue-600 underline">model unavailability by malicious users</a>.</li>
    <li>Apply conventional application security and operational security measures for AI systems.</li>
  </ul>

### 2. Evaluating Risks by Estimating Likelihood and Impact

  <p class="text-gray-700">
    To determine the severity of a risk, it is necessary to assess the probability of the risk occurring and evaluate the potential consequences should the risk materialize.
  </p>

  <h4 class="text-lg font-semibold mt-4">Estimating the Likelihood</h4>
  <p class="text-gray-700">
    Estimating the likelihood and impact of an AI risk requires understanding both the technical and contextual aspects of the AI system. Likelihood is influenced by algorithm complexity, data quality, conventional security measures, and potential adversarial attacks. For example, an AI system processing public data is more susceptible to data poisoning and inference attacks. A financial institution using public credit scores could be vulnerable to manipulation, leading to incorrect loan decisions.
  </p>

  <h4 class="text-lg font-semibold mt-4">Evaluating the Impact</h4>
  <p class="text-gray-700">
    Evaluating impact involves understanding the potential consequences of a threat materializing. This includes direct consequences, such as compromised data integrity or downtime, and indirect consequences like reputational damage or regulatory penalties. AI systems often magnify these impacts due to their scale and critical tasks. For instance, a successful attack on healthcare diagnostic AI could lead to misdiagnosis, legal liability, and reputational damage.
  </p>

  <h4 class="text-lg font-semibold mt-4">Prioritizing Risks</h4>
  <p class="text-gray-700">
    Combining likelihood and impact assessments helps prioritize risks and informs Risk Treatment decisions. Organizations often use a <strong>risk heat map</strong> to visualize risks by impact and likelihood, focusing management attention on high-severity risks.
  </p>

### 3. Risk Treatment

  <p class="text-gray-700">
    Risk treatment involves selecting measures to mitigate, transfer, avoid, or accept cybersecurity risks associated with AI systems. Effective treatment is critical due to unique AI threats like data poisoning, model theft, and adversarial attacks.
  </p>

  <ul class="list-decimal list-inside space-y-2 text-gray-700">
    <li><strong>Mitigation:</strong> Implement controls to reduce likelihood or impact.
      <ul class="list-disc list-inside ml-5">
        <li>Example: Enhance data validation to prevent data poisoning during model training.</li>
      </ul>
    </li>
    <li><strong>Transfer:</strong> Shift risk to a third party via transfer learning, federated learning, insurance, or outsourcing.
      <ul class="list-disc list-inside ml-5">
        <li>Example: Use third-party cloud services with robust security for AI training and hosting.</li>
      </ul>
    </li>
    <li><strong>Avoidance:</strong> Change plans to eliminate the risk.
      <ul class="list-disc list-inside ml-5">
        <li>Example: Avoid deploying AI on highly sensitive personal data where risk is high.</li>
      </ul>
    </li>
    <li><strong>Acceptance:</strong> Acknowledge risk without mitigation when cost outweighs impact.
      <ul class="list-disc list-inside ml-5">
        <li>Example: Accept minimal risk of model inversion in non-sensitive applications.</li>
      </ul>
    </li>
  </ul>

### 4. Risk Communication & Monitoring

  <p class="text-gray-700">
    Share risk information with stakeholders to maintain awareness and support. A central tool is the <strong>Risk Register</strong>, documenting all identified risks, their attributes (severity, treatment plan, ownership, status), and controls. Align AI risk vocabulary with Enterprise Risk Management for consistent communication.
  </p>

### 5. Arrange Responsibility

  <p class="text-gray-700">
    Determine responsibility for each selected threat. The organization building and deploying the AI system is usually responsible. Shared responsibilities apply when using hosting providers or external services. Components can include the model, extensions, application, or infrastructure. See <a href="#threat-model-with-controls---genai-as-is" class="text-blue-600 underline">Threat model of using a model as-is</a>.
  </p>
  <p class="text-gray-700">
    If an external party does not provide transparency, options include accepting the risk, implementing your own mitigations, or avoiding the risk by not engaging the third party.
  </p>

### 6. Verify External Responsibilities

  <p class="text-gray-700">
    For threats managed by other organizations, obtain assurance that controls are in place. Example: regular audits and security assessments of third-party measures.
  </p>

### 7. Select Controls

  <p class="text-gray-700">
    For threats under your responsibility, review associated controls, including general controls. Assess the purpose, effectiveness, cost, and implementation priority. Start with high-risk threats and low-cost, quick-win controls. Tune quality parameters to your situation and continuously test controls in simulation and production environments.
  </p>

### 8. Residual Risk Acceptance

  <p class="text-gray-700">
    Accept remaining risks after implementing controls. Ensure severity is sufficiently low to avoid business impact.
  </p>

### 9. Further Management of the Selected Controls

  <p class="text-gray-700">
    See <a href="/goto/secprogram/" class="text-blue-600 underline">SECPROGRAM</a> for continuous monitoring, documentation, reporting, and incident response.
  </p>

### 10. Continuous Risk Assessment

  <p class="text-gray-700">
    Implement continuous monitoring to detect and respond to new threats. Update risk strategies based on evolving threats and incident response feedback. Example: regularly review and update risk treatment plans for new vulnerabilities.
  </p>

---

  <!-- AI outside Machine Learning -->

## How about ...

### How about AI outside of machine learning?

  <p class="text-gray-700">
    A helpful way to look at AI is to see it as consisting of machine learning (the current dominant type of AI) models and <em>heuristic models</em>. A model can be a machine learning model which has learned how to compute based on data, or it can be a heuristic model engineered based on human knowledge, e.g. a rule-based system. Heuristic models still require data for testing, and in some cases, for conducting analysis that supports further development and validation of human-derived knowledge.
  </p>
  <p class="text-gray-700">
    This document focuses on machine learning. Nevertheless, here is a quick summary of the machine learning threats from this document that also apply to heuristic systems:
  </p>
  <ul class="list-disc pl-6 text-gray-700 space-y-1">
    <li>Model evasion is also possible with heuristic models, as attackers may try to find loopholes or weaknesses in the defined rules.</li>
    <li>Model theft through use - it is possible to train a machine learning model based on input/output combinations from a heuristic model.</li>
    <li>Overreliance in use - heuristic systems can also be relied on too much. The applied knowledge can be false.</li>
    <li>Both data poisoning and model poisoning can occur by tampering with the data used to enhance knowledge, or by manipulating the rules either during development or at runtime.</li>
    <li>Leaks of data used for analysis or testing can still be an issue.</li>
    <li>Knowledge base, source code and configuration can be regarded as sensitive data when it is intellectual property, so it needs protection.</li>
    <li>Leak sensitive input data, for example when a heuristic system needs to diagnose a patient.</li>
  </ul>

  <!-- Responsible or Trustworthy AI -->

### How about responsible or trustworthy AI?

  <blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700">
    Category: discussion<br>
    Permalink: <a href="https://owaspai.org/goto/responsibleai/" class="text-blue-600 underline">https://owaspai.org/goto/responsibleai/</a>
  </blockquote>
  <p class="text-gray-700">
    There are many aspects of AI when it comes to positive outcome while mitigating risks. This is often referred to as responsible AI or trustworthy AI, where the former emphasises ethics, society, and governance, while the latter emphasises the more technical and operational aspects.
  </p>
  <p class="text-gray-700">
    If your primary responsibility is security, it's best to start by focusing on AI security. Once you have a solid grasp of that, you can expand your knowledge to other AI aspects, even if it's just to support colleagues who are responsible for those areas and help them stay vigilant. After all, security professionals are often skilled at spotting potential failure points. Furthermore, some aspects can be a consequence of compromised AI and are therefore helpful to understand, such as <em>safety</em>.
  </p>

  <h4 class="text-lg font-semibold mt-4">Principles of AI and connection to security</h4>
  <ul class="list-disc pl-6 text-gray-700 space-y-2">
    <li><strong>Accuracy:</strong> Ensuring the AI model performs correctly. Incorrect outputs may lead to safety problems or other harmful decisions. Security attacks can cause accuracy issues.</li>
    <li><strong>Safety:</strong> Being protected from or unlikely to cause harm. Shared concern between safety and security, includes oversight, continuous validation, transparency, and explainability.</li>
    <li><strong>Transparency:</strong> Sharing information about the approach to warn users and depending systems of accuracy risks.</li>
    <li><strong>Explainability:</strong> Helping users understand results to validate accuracy and support transparency.</li>
    <li><strong>Robustness:</strong> Maintaining accuracy under variations in input, with security focusing on adversarial robustness.</li>
    <li><strong>Free of discrimination:</strong> Detecting unwanted bias to prevent unfair outcomes, which may indicate attacks such as data poisoning.</li>
    <li><strong>Empathy:</strong> Recognizing limits of security in protecting individuals or organizations.</li>
    <li><strong>Accountability:</strong> Demonstrating security measures and ensuring traceability to detect and respond to incidents.</li>
    <li><strong>AI security:</strong> Central topic covering input attacks, model poisoning, stealing AI assets, and runtime security threats.</li>
  </ul>
    <a href="/images/aiwayfinder.png" target="_blank" rel="noopener noreferrer">
      <img src="/images/aiwayfinder.png" alt="AI Wayfinder" class="mx-auto rounded-md shadow-md hover:shadow-lg transition-shadow duration-200">
    </a>


  <!-- Generative AI -->

### How about Generative AI (e.g. LLM)?

  <blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700">
    Category: discussion<br>
    Permalink: <a href="https://owaspai.org/goto/genai/" class="text-blue-600 underline">https://owaspai.org/goto/genai/</a>
  </blockquote>
  <p class="text-gray-700">
    GenAI is leading the current AI revolution and is the fastest moving subfield of AI security. Other predictive AI algorithms will remain important for credit scoring, fraud detection, medical diagnosis, product recommendations, and more.
  </p>

  <!-- Table for GenAI security -->

  <table class="min-w-full divide-y divide-gray-200 border border-gray-300">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">Nr.</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">GenAI security particularities</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">OWASP for LLM TOP 10</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr>
        <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">1</td>
        <td class="px-6 py-4 border-b border-gray-300">
          GenAI models are controlled by natural language in prompts, creating the risk of <a href="/goto/promptinjection/" class="text-blue-600 underline">Prompt injection</a>. Direct prompt injection is where the user tries to fool the model to behave in unwanted ways (e.g. offensive language), whereas with indirect prompt injection it is a third party that injects content into the prompt for this purpose (e.g. manipulating a decision).
        </td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="https://genai.owasp.org/llmrisk/llm01/" class="text-blue-600 underline">OWASP for LLM 01: Prompt injection</a>
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">2</td>
        <td class="px-6 py-4 border-b border-gray-300">
          GenAI models have typically been trained on very large datasets, which makes it more likely to output <a href="/goto/disclosureuseoutput/" class="text-blue-600 underline">sensitive data</a> or <a href="/goto/copyright/" class="text-blue-600 underline">licensed data</a>, for which there is no control of access privileges built into the model. All data will be accessible to the model users. Some mechanisms may be in place in terms of system prompts or output filtering, but those are typically not watertight.
        </td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="https://genai.owasp.org/llmrisk/llm02/" class="text-blue-600 underline">OWASP for LLM 02: Sensitive Information Disclosure</a>
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">3</td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="/goto/modelpoison/" class="text-blue-600 underline">Data and model poisoning</a> is an AI-broad problem, and with GenAI the risk is generally higher since training data can be supplied from different sources that may be challenging to control, such as the internet. Attackers could for example hijack domains and place manipulated information.
        </td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="https://genai.owasp.org/llmrisk/llm04/" class="text-blue-600 underline">OWASP for LLM 04: Data and Model Poisoning</a>
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">4</td>
        <td class="px-6 py-4 border-b border-gray-300">
          GenAI models can be inaccurate and hallucinate. Large Language Models (GenAI) can make matters worse by coming across as very confident and knowledgeable. This is about the risk of underestimating the probability that the model is wrong or has been manipulated. Strongest link with <a href="/goto/limitunwanted/" class="text-blue-600 underline">controls that limit the impact of unwanted model behavior</a>, particularly <a href="/goto/leastmodelprivilege/" class="text-blue-600 underline">Least model privilege</a>.
        </td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="https://genai.owasp.org/llmrisk/llm06/" class="text-blue-600 underline">OWASP for LLM 06: Excessive agency</a> and <a href="https://genai.owasp.org/llmrisk/llm09/" class="text-blue-600 underline">OWASP for LLM 09: Misinformation</a>
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">5</td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="/goto/leakinput/" class="text-blue-600 underline">Leaking input data</a>: GenAI models mostly live in the cloud, often managed externally, which may increase the risk of leaking training data and prompts. Two particular risks: 1) model use involves user interaction through prompts, 2) model input (prompts) can contain sensitive context information (e.g. company secrets). Information travels with the prompt to the cloud, and original access rights may not be respected.
        </td>
        <td class="px-6 py-4 border-b border-gray-300">
          Not covered in LLM top 10
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">6</td>
        <td class="px-6 py-4 border-b border-gray-300">
          Pre-trained models may have been manipulated. The approach is common in GenAI, increasing the risk of <a href="/goto/supplymodelpoison/" class="text-blue-600 underline">supply-chain model poisoning</a>.
        </td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="https://genai.owasp.org/llmrisk/llm03/" class="text-blue-600 underline">OWASP for LLM 03: Supply chain vulnerabilities</a>
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">7</td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="/goto/modelinversionandmembership/" class="text-blue-600 underline">Model inversion and membership inference</a> are typically low to zero risks for GenAI.
        </td>
        <td class="px-6 py-4 border-b border-gray-300">
          Not covered in LLM top 10, apart from LLM06 (see above)
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">8</td>
        <td class="px-6 py-4 border-b border-gray-300">
          GenAI output may contain elements that perform an <a href="/goto/insecureoutput/" class="text-blue-600 underline">injection attack</a> such as cross-site-scripting.
        </td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="https://genai.owasp.org/llmrisk/llm05/" class="text-blue-600 underline">OWASP for LLM 05: Improper Output Handling</a>
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">9</td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="/goto/denialmodelservice/" class="text-blue-600 underline">Denial of service</a> can affect any AI model. GenAI models typically cost more to run, so overloading them can create unwanted costs.
        </td>
        <td class="px-6 py-4 border-b border-gray-300">
          <a href="https://genai.owasp.org/llmrisk/llm10/" class="text-blue-600 underline">OWASP for LLM 10: Unbounded consumption</a>
        </td>
      </tr>
    </tbody>
  </table>


  <h4 class="text-lg font-semibold mt-4">GenAI References:</h4>
  <ul class="list-disc pl-6 text-gray-700 space-y-1">
    <li><a href="https://llmtop10.com/" class="text-blue-600 underline">OWASP LLM top 10</a></li>
    <li><a href="https://blog.kloudzone.co.in/demystifying-the-owasp-top-10-for-large-language-model-applications/" class="text-blue-600 underline">Demystifying the LLM top 10</a></li>
    <li><a href="https://arxiv.org/pdf/2306.13033.pdf" class="text-blue-600 underline">Impacts and risks of GenAI</a></li>
    <li><a href="https://llmsecurity.net/" class="text-blue-600 underline">LLMsecurity.net</a></li>
  </ul>

  <!-- NCSC/CISA guidelines -->

### How about the NCSC/CISA guidelines?

  <blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700">
    Category: discussion<br>
    Permalink: <a href="https://owaspai.org/goto/jointguidelines/" class="text-blue-600 underline">https://owaspai.org/goto/jointguidelines/</a>
  </blockquote>
  <p class="text-gray-700">
    Mapping of the UK NCSC / CISA <a href="https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development" class="text-blue-600 underline">Joint Guidelines for secure AI system development</a> to the controls here at the AI Exchange. See the <a href="/goto/periodictable/" class="text-blue-600 underline">Periodic table of AI security</a> for linked controls.
  </p>

  <!-- Copyright Section -->

### How about copyright?

  <blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700">
    Category: discussion<br>
    Permalink: <a href="https://owaspai.org/goto/copyright/" class="text-blue-600 underline">https://owaspai.org/goto/copyright/</a>
  </blockquote>

  <h4 class="text-lg font-semibold mt-4">Introduction</h4>
  <p class="text-gray-700">AI and copyright are two areas of law and policy that raise complex questions. AI output is not yet protected by US copyright laws. Human contributors may own copyright for input content, and usage of copyrighted materials may be subject to <a href="https://en.wikipedia.org/wiki/Fair_use" class="text-blue-600 underline">fair use</a>.</p>

  <h4 class="text-lg font-semibold mt-4">AI & Copyright Security</h4>
  <p class="text-gray-700">Companies face security threats affecting intellectual property rights. AI models trained on copyrighted works without permission can pose financial and reputational risk.</p>

  <h4 class="text-lg font-semibold mt-4">Lawsuits Related to AI & Copyright</h4>
  <p class="text-gray-700">Recent cases against Stability AI, Midjourney, DeviantArt, and Getty Images highlight copyright risks in AI training data.</p>

  <h4 class="text-lg font-semibold mt-4">Copyright of AI-generated source code</h4>
  <p class="text-gray-700">Source code is IP, but AI-generated code raises questions of authorship and ownership.</p>

  <h4 class="text-lg font-semibold mt-4">Copyright damages indemnification</h4>
  <p class="text-gray-700">AI vendors like Microsoft and Google offer indemnification under certain conditions.</p>

  <h4 class="text-lg font-semibold mt-4">Do generative AI models really copy existing work?</h4>
  <p class="text-gray-700">Generative AI extracts patterns, rather than storing exact examples. Some content may resemble existing works coincidentally.</p>

  <h4 class="text-lg font-semibold mt-4">Mitigating Risk</h4>
  <ul class="list-decimal pl-6 text-gray-700 space-y-1">
    <li>Mitigate output of certain training data ([data disclosure]( /goto/disclosureuseoutput/)).</li>
    <li>Conduct comprehensive IP audits.</li>
    <li>Clear legal framework and policies.</li>
    <li>Ethical data sourcing.</li>
    <li>Define AI-generated content ownership.</li>
    <li>Confidentiality and trade secret protocols.</li>
    <li>Employee training.</li>
    <li>Compliance monitoring systems.</li>
    <li>Response planning for IP infringement.</li>
    <li>Contractual obligations from AI suppliers.</li>
  </ul>

  <h4 class="text-lg font-semibold mt-4">Helpful resources regarding AI and copyright:</h4>
<ul class="list-disc pl-6 text-gray-700 space-y-1">
  <li><a href="https://copyrightalliance.org/education/artificial-intelligence-copyright/" class="text-blue-600 underline">Artificial Intelligence (AI) and Copyright | Copyright Alliance</a></li>
  <li><a href="https://dig.watch/updates/ai-industry-faces-threat-of-copyright-law-in-2024" class="text-blue-600 underline">AI industry faces threat of copyright law in 2024 | Digital Watch Observatory</a></li>
  <li><a href="https://www.weforum.org/agenda/2024/01/cracking-the-code-generative-ai-and-intellectual-property/" class="text-blue-600 underline">Using generative AI and protecting against copyright issues | World Economic Forum</a></li>
  <li><a href="https://bipartisanpolicy.org/blog/legal-challenges-against-generative-ai-key-takeaways/" class="text-blue-600 underline">Legal Challenges Against Generative AI: Key Takeaways | Bipartisan Policy Center</a></li>
  <li><a href="https://hbr.org/2023/04/generative-ai-has-an-intellectual-property-problem" class="text-blue-600 underline">Generative AI Has an Intellectual Property Problem | Harvard Business Review</a></li>
  <li><a href="https://www.klgates.com/Recent-Trends-in-Generative-Artificial-Intelligence-Litigation-in-the-United-States-9-5-2023" class="text-blue-600 underline">Recent Trends in Generative Artificial Intelligence Litigation in the United States | K&L Gates</a></li>
  <li><a href="https://www.popsci.com/technology/generative-ai-lawsuits/" class="text-blue-600 underline">Generative AI could face its biggest legal tests in 2024 | Popular Science</a></li>
  <li><a href="https://termly.io/resources/articles/is-ai-model-training-compliant-with-data-privacy-laws/" class="text-blue-600 underline">Is AI Model Training Compliant With Data Privacy Laws? | Termly</a></li>
  <li><a href="https://techcrunch.com/2023/01/27/the-current-legal-cases-against-generative-ai-are-just-the-beginning/?guccounter=1" class="text-blue-600 underline">The current legal cases against generative AI are just the beginning | TechCrunch</a></li>
  <li><a href="https://www.mintz.com/insights-center/viewpoints/54731/2024-01-10-unfair-use-copyrighted-works-ai-training-data-ai" class="text-blue-600 underline">(Un)fair Use? Copyrighted Works as AI Training Data — AI: The Washington Report | Mintz</a></li>
  <li><a href="https://venturebeat.com/ai/potential-supreme-court-clash-looms-over-copyright-issues-in-generative-ai-training-data/" class="text-blue-600 underline">Potential Supreme Court clash looms over copyright issues in generative AI training data | VentureBeat</a></li>
  <li><a href="https://www.fieldfisher.com/en/insights/ai-related-lawsuits-how-the-stable-diffusion-case" class="text-blue-600 underline">AI-Related Lawsuits: How The Stable Diffusion Case Could Set a Legal Precedent | Fieldfisher</a></li>
</ul>
<div
  class="w-full px-4 pt-6 md:px-8 py-16"
  style="background-color: rgba(76, 175, 80, 0.1)"
>
  <h2 class="text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-16">
    We are always happy to assist you!
  </h2>
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto"
  >
    <!-- Left Column -->
    <div>
      <div class="flex flex-wrap gap-4 mb-8">
        <a
          href="#"
          class="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow"
          ><img src="/images/github.png" alt="GitHub" class="w-6 h-6"
        /></a>
        <a
          href="#"
          class="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow"
          ><img src="/images/youtube.png" alt="YouTube" class="w-6 h-6"
        /></a>
        <a
          href="#"
          class="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow"
          ><img src="/images/linkedin.png" alt="LinkedIn" class="w-6 h-6"
        /></a>
        <a
          href="#"
          class="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow"
          ><img src="/images/slack.png" alt="Slack" class="w-6 h-6"
        /></a>
      </div>
      <h3 class="text-2xl font-bold text-[#1a1a2e] mb-4">Send us a message</h3>
      <p class="text-gray-500 leading-relaxed">
        Have questions about AI security? Want to contribute to our mission?
        We'd love to hear from you. Reach out through any of our channels or use
        the contact form.
      </p>
    </div>  
    <!-- Right Column (Form) -->
    <div>
      <form class="flex flex-col gap-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name*"
            class="p-4 border border-gray-300 rounded-lg text-base"
          />
          <input
            type="text"
            placeholder="Last Name*"
            class="p-4 border border-gray-300 rounded-lg text-base"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address*"
          class="p-4 border border-gray-300 rounded-lg text-base"
        />
        <textarea
          placeholder="Message"
          rows="4"
          class="p-4 border border-gray-300 rounded-lg text-base resize-vertical"
        ></textarea>
        <button
          type="submit"
          class="bg-green-500 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 w-max hover:bg-green-600 transition"
        >
          Submit <span>→</span>
        </button>
      </form>
    </div>
  </div>
</div>