---
title: 0. AI Security Overview
weight: 1
---
## About the AI Exchange
>Category: discussion  
>Permalink: https://owaspai.org/goto/about/

**Summary**  
Welcome to the go-to single resource for AI security & privacy - over 200 pages of practical advice and references on protecting AI, and data-centric systems from threats - where AI consists of Analytical AI, Discriminative AI, Generative AI and heuristic systems. This content serves as key bookmark for practitioners, and is contributed actively and substantially to international standards such as ISO/IEC and the AI Act through official standard partnerships. Through broad collaboration with key institutes and SDOs, the _Exchange_ represents the consensus on AI security and privacy.

 <p align="center">
 <a href="https://youtu.be/kQC7ouDB_z8" target="_blank" rel="noopener noreferrer"><img width="177" height="123" src="https://github.com/OWASP/www-project-ai-security-and-privacy-guide/blob/main/assets/images/aixinfomercialthumbnail-small2.png?raw=true" border="1"/></a>
 </p>

**Details**  
The OWASP AI Exchange has open sourced the global discussion on the security and privacy of AI and data-centric systems. It is an open collaborative OWASP project to advance the development of AI security & privacy standards, by providing a comprehensive framework of AI threats, controls, and related best practices. Through a unique official liaison partnership, this content is feeding into standards for the EU AI Act (50 pages contributed), ISO/IEC 27090 (AI security, 70 pages contributed), ISO/IEC 27091 (AI privacy), and [OpenCRE](https://opencre.org) - which we are currently preparing to provide the AI Exchange content through the security chatbot [OpenCRE-Chat](https://opencre.org/chatbot).

Data-centric systems can be divided into AI systems and 'big data' systems that don't have an AI model (e.g. data warehousing, BI, reporting, big data) to which many of the threats and controls in the AI Exchange are relevant: data poisoning, data supply chain management, data pipeline security, etc.

Security here means preventing unauthorized access, use, disclosure, disruption, modification, or destruction. Modification includes manipulating the behaviour of an AI model in unwanted ways.

Our **mission** is to be the go-to resource for security & privacy practitioners for AI and data-centric systems, to foster alignment, and drive collaboration among initiatives. By doing so, we provide a safe, open, and independent place to find and share insights for everyone. Follow [AI Exchange at LinkedIn](https://www.linkedin.com/company/owasp-ai-exchange/).

**How it works**  
The AI Exchange is displayed here at [owaspai.org](https://owaspai.org) and edited using a [GitHub repository](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/tree/main/content/ai_exchange/content) (see the links _Edit on Github_). It is an **open-source living publication** for the worldwide exchange of AI security & privacy expertise. It is structured as one coherent resource consisting of several sections under 'content', each represented by a page on this website.

This material is evolving constantly through open source continuous delivery. The authors group consists of over 70 carefully selected experts (researchers, practitioners, vendors, data scientists, etc.) and other people in the community are welcome to provide input too. See the [contribute page](/contribute).

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://owaspai.org">OWASP AI Exchange</a> by <span property="cc:attributionName">The AI security community</span> is marked with <a href="http://creativecommons.org/publicdomain/zero/1.0?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC0 1.0</a> meaning you can use any part freely without copyright and without attribution. If possible, it would be nice if the OWASP AI Exchange is credited and/or linked to, for readers to find more information.</p>

**Who is this for**  
The Exchange is for practitioners in security, privacy, engineering, testing, governance, and for end users in an organization - anyone interested in the security and privacy of AI systems. The goal is to make the material as easy as possible to access. Using the [Risk analysis section](/goto/riskanalysis/) your can quickly narrow down the issues that matter to your situation, whether you are a large equipment manufacturer designing an AI medical device, or a small travel agency using a chatbot for HR purposes.

**History**  
The AI Exchange was founded in 2022 by [Rob van der Veer](https://www.linkedin.com/in/robvanderveer/) - bridge builder for security standards, Chief AI Officer at [Software Improvement Group](https://www.softwareimprovementgroup.com), with 33 years of experience in AI & security, lead author of ISO/IEC 5338 on AI lifecycle, founding father of OpenCRE, and currently working in ISO/IEC 27090, ISO/IEC 27091 and the EU AI act in CEN/CENELEC, where he was elected co-editor by the EU member states.

The project started out as the 'AI security and privacy guide' in October 22 and was rebranded a year later as 'AI Exchange' to highlight the element of global collaboration. In March 2025 the AI Exchange was awarded the status of 'OWASP Flagship project' because of its critical importance, together with the ['GenAI Security Project'](https://genai.owasp.org/).

**The AI Exchange is trusted by industry giants**

Dimitri van Zantvliet, Director Cybersecurity, Dutch Railways:
> "A risk-based, context-aware approach—like the one OWASP Exchange champions—not only supports the responsible use of AI, but ensures that real threats are mitigated without burdening engineers with irrelevant checklists. We need standards written by those who build and defend these systems every day."

Sri Manda, Chief Security & Trust Officer at Peloton Interactive:
> “AI regulation is critical for protecting safety and security, and for creating a level playing field for vendors. The challenge is to remove legal uncertainty by making standards really clear, and to avoid unnecessary requirements by building in flexible compliance. I’m very happy to see that OWASP Exchange has taken on these challenges by bringing the security community to the table to ensure we get standards that work.”

Prateek Kalasannavar, Staff AI Security Engineer, Lenovo:
> “At Lenovo, we’re operationalizing AI product security at scale, from embedded inference on devices to large-scale cloud-hosted models. OWASP AI Exchange serves as a vital anchor for mapping evolving attack surfaces, codifying AI-specific testing methodologies, and driving community-aligned standards for AI risk mitigation. It bridges the gap between theory and engineering.”


## Relevant OWASP AI initiatives
>Category: discussion  
>Permalink: https://owaspai.org/goto/aiatowasp/

In short, the two flagship OWASP AI projects:
- The **OWASP AI Exchange** is a comprehensive core framework of threats, controls and related best practices for all AI, actively aligned with international standards and feeding into them. It covers all types of AI, and next to security it discusses privacy as well.
- The **OWASP GenAI Security Project** is a growing collection of documents on the security of Generative AI, covering a wide range of topics including the LLM top 10.

Here's more information on AI at OWASP: 
- If you want to **ensure security or privacy of your AI or data-centric system** (GenAI or not), or want to know where AI security standardisation is going, you can use the [AI Exchange](https://owaspai.org), and from there you will be referred to relevant further material (including GenAI security project material) where necessary. 
- If you want to get a **quick overview** of key security concerns for Large Language Models, check out the [LLM top 10 of the GenAI project](https://genai.owasp.org/llm-top-10/). Please know that it is not complete, intentionally - for example it does not include the security of prompts.
- For **any specific topic** around Generative AI security, check the [GenAI security project](https://genai.owasp.org/) or the [AI Exchange references](/goto/references/).

Some more details on the projects: 
- [The OWASP AI Exchange(this work)](/goto/about/) is the go-to single resource for AI security & privacy - over 200 pages of practical advice and references on protecting AI, and data-centric systems from threats - where AI consists of Analytical AI, Discriminative AI, Generative AI and heuristic systems. This content serves as key bookmark for practitioners, and is contributed actively and substantially to international standards such as ISO/IEC and the AI Act through official standard partnerships.
- The [OWASP GenAI Security Project](https://genai.owasp.org/) is an umbrella project of various initiatives that publish documents on Generative AI security, including the LLM AI Security & Governance Checklist and the LLM top 10 - featuring the most severe security risks of Large Language Models.
- [OpenCRE.org](https://opencre.org) has been established under the OWASP Integration standards project(from the _Project wayfinder_) and holds a catalog of common requirements across various security standards inside and outside of OWASP. OpenCRE will link AI security controls soon.

When comparing the AI Exchange with the GenAI Security Project, the Exchange:
- feeds straight into international standards
- is about all AI and data centric systems instead of just Generative AI
- is delivered as a single resource instead of a collection of documents
- is updated continuously instead of published at specific times
- is focusing on a framework of threats, controls, and related practices, making it more technical-oriented, whereas the GenAI project covers a broader range of aspects
- also covers AI privacy
- is offered completely free of copyright and attribution


## Summary - How to address AI Security?
>Category: discussion  
>Permalink: https://owaspai.org/goto/summary/

While Artificial Intelligence (AI) offers tremendous opportunities, it also brings new risks including security threats. It is therefore imperative to approach AI applications with a clear understanding of potential threats and the controls against them. 

[![](/images/guard.png)](/images/guard.png)

The five steps - G.U.A.R.D - to address AI security are: 

1. **Govern**  
  Implement [AI governance](/goto/aiprogram/) including arranging [compliance](/goto/checkcompliance/). Agree on responsibilities, know what is going on, implement policy, [education](/goto/seceducate/), etc. 
2. **Understand**  
   Know the relevant [AI security threats](/goto/threatsoverview/) and the corresponding [process controls and technical controls](/goto/periodictable/) that need to be applied by you or your suppliers.
3. **Adapt**  
  - [Adapt your security practices](/goto/secprogram/) to include AI security assets, threats and controls from this document.
  - Adapt your threat modelling to include the [AI security threat model](/goto/riskanalysis/)
  - Adapt your testing to include [AI-specific security testing](/goto/testing/)
  - Adapt your supply chain management to include [data and model management](/goto/supplychainmanage/)
  - If you develop AI systems (even if you don't train your own models): Adapt your [software development practices](/goto/devprogram/) and [secure development program](/goto/secdevprogram/) to involve AI engineering . 
4. **Reduce**  
  Reduce potential impact by [minimizing or obfuscating sensitive data](/goto/datalimit/) and [limiting the impact of unwanted behaviour](/goto/limitunwanted/) (e.g., managing privileges, guardrails, human oversight etc. Basically: apply Murphy's law.
5. **Demonstrate**  
    Show evidence of responsible AI security through transparency, documentation, and communication. Prove to management, regulators, and clients that your AI systems are under control and that the applied safeguards work as intended.

---

## How to use this Document
>Category: discussion  
>Permalink: https://owaspai.org/goto/document/

The AI Exchange is a single coherent resource on the security and privacy of AI systems, presented on this website, divided over several pages - containing threats, controls, guidelines, tests and references.

**Ways to start, depending on your need:**
- **Learn more about the AI Exchange**:  
  See [About](https://owaspai.org/goto/about/)
- **Start AI security as organization**:  
  See [How to address AI security?](https://owaspai.org/goto/summary/) for the key steps to get started as organization.
- **Start AI security as individual**:  
  See 'learn/lookup' below to familiarize yourself with the threats and controls.
- **Secure a system**:  
   If you want your **AI system to be secure**, start with [risk analysis](/goto/riskanalysis/) to guide you through a number of questions, resulting in the threats that apply. And when you click on those threats you'll find the controls (countermeasures) to check for, or to implement.
- **Learn / look up**:  
  - To see a general overview and discussion of all **threats** from different angles, check the [AI threat model](/goto/threatsoverview/) or the [AI security matrix](/goto/aisecuritymatrix). In case you know the threat you need to protect against, find it in the overview of your choice and click to get more information and how to protect against it.
  - To find out what to do against a specific threat, check the [controls overview](/goto/controlsoverview/) or the [periodic table](/goto/periodictable/) to find the right **controls**.
  - To learn about **privacy** of AI systems, check [the privacy section](/goto/aiprivacy/).
  - Agentic AI aspects are covered throughout all content, with a specific section [here](/goto/agenticaithreats/).
  - To look up a specific topic, use the search function or the [index](/goto/index/).
  - Looking for more information, or training material: see the [references](/goto/references/).
- **Test**:  
  If you want to **test** the security of AI systems with tools, go to [the testing page](/goto/testing/).

The AI exchange covers both heuristic artificial intelligence (e.g. expert systems) and machine learning. This means that when we talk about an AI system, it can for example be a Large Language Model, a linear regression function, a rule-based system, or a lookup table based on statistics. Throughout this document it is made clear when which threats and controls play a role.


**The structure**  
You can see the high-level structure on the [main page](https://owaspai.org). On larger screens you can see the structure of pages on the left sidebar and the structure within the current page on the right. On smaller screens you can view these structures through the menu.

In short the structure is:  
0. [AI security overview - this page](/docs/ai_security_overview), contais an overview of AI security and discussions of various topics.
1. [General controls, such as AI governance](/goto/generalcontrols/)
2. [Threats through use, such as evasion attacks](/goto/threatsuse/)
3. [Development-time threats, such as data poisoning](/goto/developmenttime/)
4. [Runtime security threats, such as insecure output](/goto/runtimeappsec/)
5. [AI security testing](/goto/testing/)
6. [AI privacy](/goto/aiprivacy)
7. [References](/goto/references/)

This page will continue with discussions about:
- A high-level overview of threats
- Various overviews of threats and controls: the matrix, the periodic table, and the navigator
- Risk analysis to select relevant threats and controls
- Various other topics: heuristic systems, responsible AI, generative AI, the NCSC/CISA guidelines,and copyright

---

## Threats overview
>Category: discussion  
>Permalink: https://owaspai.org/goto/threatsoverview/

### Threat model
We distinguish between three types of threats:
1. threats during development-time (when data is obtained and prepared, and the model is trained/obtained) - for example data poisoning
2. threats through using the model (through inference; providing input and getting the output) - for example prompt injection or evasion
3. other threats to the system during runtime (in operation - not through inference) - for example stealing model input

In AI, we outline 6 types of impacts that align with three types of attacker goals (disclose, deceive and disrupt):
1. disclose: hurt confidentiality of train/test data
2. disclose: hurt confidentiality of model Intellectual property (the _model parameters_ or the process and data that led to them)
3. disclose: hurt confidentiality of input data
4. deceive: hurt integrity of model behaviour (the model is manipulated to behave in an unwanted way and consequentially, deceive users)
5. disrupt: hurt availability of the model (the model either doesn't work or behaves in an unwanted way - not to deceive users but to disrupt normal operations)
6. disrupt/disclose: confidentiality, integrity, and availability of non AI-specific assets

The threats that create these impacts use different attack surfaces. For example: the confidentiality of train data can be compromised by hacking into the database during development, but it can also get leaked by a _membership inference attack_ that can find out whether a certain individual was in the train data, simply by feeding that person's data into the model and looking at the details of the model output.

The diagram shows the threats as arrows. Each threat has a specific impact, indicated by letters referring to the Impact legend. The control overview section contains this diagram with groups of controls added.
[![](/images/threats.png)](/images/threats.png)

### Threats to agentic AI
>Category: discussion  
>Permalink: https://owaspai.org/goto/agenticaithreats/

In Agentic AI, AI systems can take action instead of just present output, and sometimes act pro-actively or communicate with other agents. Important note: these are still software systems and AI systems, so everything in the AI Exchange applies, but there are a few attention points. 

An example of Agentic AI is a set of voice assistants that can control your heating, send emails, and even invite more assistants into the conversation. That’s powerful—but you’d probably want it to check with you first before sending a thousand emails.  

There are four typical properties of agentic AI:
1. Action: Agents don’t just chat — they invoke functions such as sending an email. That makes [LEAST MODEL PRIVILEGE](/goto/leastmodelprivilege/) a key control.
2. Autonomous: Agents can trigger each other, enabling autonomous responses (e.g. a script receives an email, triggering a GenAI follow-up). That makes [OVERSIGHT](/goto/oversight/) important, and it makes working memory an attack vector because that's where the state of an automonous agent lives.
3. Complex: Agentic behaviour is emergent.
4. Multi-system: You often work with a mix of systems and interfaces. Because of that, developers tend to assign responsibilities regarding access control to the AI using instructions, opening up the door for manipulation through [prompt injection](/goto/promptinjection/).

What does this mean for security?
- Hallucinations and prompt injections can change commands — or even escalate privileges. Don’t give GenAI models/agents direct access control. Build that into your architecture.
- The attack surface is wide, and the potential impact should not be underestimated.
- Because of that, the known controls become even more important — such as security of inter-model communication (e.g. MCP), traceability, protecting memory integrity, prompt injection defenses, rule-based guardrails, least model privilege, and human oversight. See the [controls overview section](/goto/controlsoverview/).

For more details on the agentic AI threats, see the [Agentic AI threats and mitigations, from the GenAI security project](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/). For a more general discussion of Agentic AI, see [this article from Chip Huyen](https://huyenchip.com/2025/01/07/agents.html).

The [testing section](/goto/testing/) discusses more about agentic AI red teaming and links to the collaboration between CSA and the Exchange: the Agentic AI red teaming guide.



### AI Security Matrix
>Category: discussion  
>Permalink: https://owaspai.org/goto/aisecuritymatrix/

The AI security matrix below (click to enlarge) shows all threats and risks, ordered by type and impact.
[![](/images/OwaspAIsecuritymatix.png)](/images/OwaspAIsecuritymatix.png)

Clickable version, based on the [Periodic table](/goto/periodictable/):
<table><thead>
<tr><th>Asset &amp; Impact</th><th>Attack surface with lifecycle</th><th>Threat/Risk category</th></tr>
</thead><tbody>
<tr><td rowspan="7">Model behaviour Integrity</td><td rowspan="3">Runtime -Model use (provide input/ read output)</td><td><a href="/goto/directpromptinjection/">Direct prompt injection</a></td></tr>
<tr>                                         <td><a href="/goto/indirectpromptinjection/">Indirect prompt injection</a></td></tr>
<tr>                                         <td><a href="/goto/evasion/">Evasion</a> (e.g. adversarial examples)</td></tr>
<tr>                                         <td>Runtime - Break into deployed model</td><td><a href="/goto/runtimemodelpoison/">Model poisoning runtime</a> (reprogramming)</td></tr>
<tr><td rowspan="2">Development -Engineering environment</td><td><a href="/goto/devmodelpoison/">Development-environment model poisoning</a></td></tr>
<tr>                                         <td><a href="/goto/datapoison/">Data poisoning of train/finetune data</a></td></tr>
<tr><td>Development - Supply chain</td><td><a href="/goto/supplymodelpoison/">Supply-chain model poisoning</a></td></tr>
<tr><td rowspan="3">Training data Confidentiality</td><td rowspan="2">Runtime - Model use</td><td><a href="/goto/disclosureuseoutput/">Data disclosure in model output</a></td></tr>
<tr><td><a href="/goto/modelinversionandmembership/">Model inversion / Membership inference</a></td></tr>
<tr><td>Development - Engineering environment</td><td><a href="/goto/devdataleak/">Training data leaks</a></td></tr>
<tr><td rowspan="3">Model confidentiality</td><td>Runtime - Model use</td><td><a href="/goto/modeltheftuse/">Model theft through use</a> (input-output harvesting)</td></tr>
<tr><td>Runtime - Break into deployed model</td><td><a href="/goto/runtimemodeltheft/">Direct model theft runtime</a></td></tr>
<tr><td>Development - Engineering environment</td><td><a href="/goto/devmodelleak/">Model theft development-time</a></td></tr>
<tr><td>Model behaviour Availability</td><td>Model use</td><td><a href="/goto/denialmodelservice/">Denial of model service</a> (model resource depletion)</td></tr>
<tr><td>Model input data Confidentialiy</td><td>Runtime - All IT</td><td><a href="/goto/leakinput/">Model input leak</a></td></tr>
<tr><td>Any asset, CIA</td><td>Runtime-All IT</td><td><a href="/goto/insecureoutput/">Model output contains injection</a></td></tr>
<tr><td>Any asset, CIA</td><td>Runtime - All IT</td><td>Conventional runtime security attack on conventional asset</td></tr>
<tr><td>Any asset, CIA</td><td>Runtime - All IT</td><td>Conventional attack on conventional supply chain</td></tr>
</tbody></table>


---

## Controls overview
>Category: discussion  
>Permalink: https://owaspai.org/goto/controlsoverview/

### Threat model with controls - general
The below diagram puts the controls in the AI Exchange into groups and places these groups in the right lifecycle with the corresponding threats.
[![](/images/threatscontrols.png)](/images/threatscontrols.png)
The groups of controls form a summary of how to address AI security (controls are in capitals):
1. **AI Governance**: integrate AI comprehensively into your information security and software development lifecycle processes, not just by addressing AI risks, but by embedding AI considerations across the entire lifecycle:  
   >( [AIPROGRAM](/goto/aiprogram/ ), [SECPROGRAM](/goto/secprogram/), [DEVPROGRAM](/goto/devprogram/), [SECDEVPROGRAM](/goto/secdevprogram/), [CHECKCOMPLIANCE](/goto/checkcompliance/), [SECEDUCATE](/goto/seceducate/))
2. Apply conventional **technical IT security controls** in a risk-based manner, since an AI system is an IT system:
    - 2a Apply **standard** conventional IT security controls (e.g. 15408, ASVS, OpenCRE, ISO 27001 Annex A, NIST SP800-53) to the complete AI system and don't forget the new AI-specific assets :
      - Development-time: model & data storage, model & data supply chain, data science documentation:  
        >([DEVSECURITY](/goto/devsecurity/), [SEGREGATEDATA](/goto/segregatedata/), [SUPPLYCHAINMANAGE](/goto/supplychainmanage/), [DISCRETE](/goto/discrete/))
      - Runtime: model storage, model use, plug-ins, and model input/output:  
        >([RUNTIMEMODELINTEGRITY](/goto/runtimemodelintegrity/), [RUNTIMEMODELIOINTEGRITY](/goto/runtimemodeliointegrity/), [RUNTIMEMODELCONFIDENTIALITY](/goto/runtimemodelconfidentiality/), [MODELINPUTCONFIDENTIALITY](/goto/modelinputconfidentiality/), [ENCODEMODELOUTPUT](/goto/encodemodeloutput/), [LIMITRESOURCES](/goto/limitresources/))
    - 2b **Adapt** conventional IT security controls to make them more suitable for AI (e.g. which usage patterns to monitor for):  
      >([MONITORUSE](/goto/monitoruse/), [MODELACCESSCONTROL](/goto/modelaccesscontrol/), [RATELIMIT](/goto/ratelimit/))
    - 2c Adopt **new** IT security controls:  
      >([CONFCOMPUTE](/goto/confcompute/), [MODELOBFUSCATION](/goto/modelobfuscation/), [PROMPTINPUTVALIDATION](/goto/promptinputvalidation/), [INPUTSEGREGATION](/goto/inputsegregation/))
3. Apply risk-based **data science security controls** :
    - 3a Development-time controls when developing the model:  
      >([FEDERATEDLEARNING](/goto/federatedlearning/), [CONTINUOUSVALIDATION](/goto/continuousvalidation/), [UNWANTEDBIASTESTING](/goto/unwantedbiastesting/), [EVASIONROBUSTMODEL](/goto/evasionrobustmodel/), [POISONROBUSTMODEL](/goto/poisonrobustmodel/), [TRAINADVERSARIAL](/goto/trainadversarial/), [TRAINDATADISTORTION](/goto/traindatadistortion/), [ADVERSARIALROBUSTDISTILLATION](/goto/adversarialrobustdistillation/), [MODELENSEMBLE](/goto/modelensemble/), [MORETRAINDATA](/goto/moretraindata/), [SMALLMODEL](/goto/smallmodel/), [DATAQUALITYCONTROL](/goto/dataqualitycontrol/), [MODELALIGNMENT](/goto/modelalignment/))
    - 3b Runtime controls to filter and detect attacks:  
      >([DETECTODDINPUT](/goto/detectoddinput/), [DETECTADVERSARIALINPUT](/goto/detectadversarialinput/), [DOSINPUTVALIDATION](/goto/dosinputvalidation/), [INPUTDISTORTION](/goto/inputdistortion/), [FILTERSENSITIVEMODELOUTPUT](/goto/filtersensitivemodeloutput/), [OBSCURECONFIDENCE](/goto/obscureconfidence/))
4. **Minimize data:** Limit the amount of data at rest and in transit. Also, limit data storage time, development-time and runtime:  
   >([DATAMINIMIZE](/goto/dataminimize/), [ALLOWEDDATA](/goto/alloweddata/), [SHORTRETAIN](/goto/shortretain/), [OBFUSCATETRAININGDATA](/goto/obfuscatetrainingdata/))
5. **Control behaviour impact** as the model can behave in unwanted ways - unintentionally or by manipulation:  
   >([OVERSIGHT](/goto/oversight/), [LEASTMODELPRIVILEGE](/goto/leastmodelprivilege/), [AITRANSPARENCY](/goto/aitransparency/), [EXPLAINABILITY](/goto/explainability/), [CONTINUOUSVALIDATION](/goto/continuousvalidation/), [UNWANTEDBIASTESTING](/goto/unwantedbiastesting/))

All threats and controls are explored in more detail in the subsequent sections of the AI Exchange.

### Threat model with controls - GenAI trained/fine tuned
The diagram below focuses on threats and controls related to Generative AI, specifically in scenarios where the organization is responsible for **training or fine-tuning** the model. (note: this is not very common given the high cost and required expertise).

[![AI Security Threats and controls - GenAI trained or fine tuned](/images/threatscontrols-genainotready.png)](/images/threatscontrols-genainotready.png)

### Threat model with controls - GenAI as-is
The diagram below focuses on threats and controls related to Generative AI when the organization uses the model as-is, without any additional training or fine-tuning. The provider (e.g. OpenAI) has done the training/fine tuning. Therefore, some risks are the responsibility of the model provider (sensitive/copyrighted data, manipulation at the provider). Nevertheless, the organization that uses the model should take these risks into account and gain assurance about them from the provider.

In many cases, the as-is model is hosted externally, meaning security largely depends on how the supplier handles data, including the security configuration. 
Some relevant questions to ask here include: 
- How is the API protected? 
- What is hosted within the Virtual Private Cloud (VPC)? The entire external model, or just the API? 
- How is key management handled? 
- What are the data retention policies? 
- Is logging enabled, and if so, what is logged? 
- Does the model send out sensitive input data when communicating with third-party sources?

[![AI Security Threats and controls - GenAI as-is](/images/threatscontrols-readymodel.png)](/images/threatscontrols-readymodel.png)

### Periodic table of AI security
>Category: discussion  
>Permalink: https://owaspai.org/goto/periodictable/

The table below, created by the OWASP AI Exchange, shows the various threats to AI and the controls you can use against them – all organized by asset, impact and attack surface, with deeplinks to comprehensive coverage here at the AI Exchange website.  
Note that [general governance controls](/goto/governancecontrols/) apply to all threats.

<table><thead>
<tr><th>Asset &amp; Impact</th><th>Attack surface with lifecycle</th><th>Threat/Risk category</th><th>Controls</th></tr>
</thead><tbody>
<tr><td rowspan="7">Model behaviour Integrity</td><td rowspan="3">Runtime -Model use (provide input/ read output)</td><td><a href="/goto/directpromptinjection/">Direct prompt injection</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/promptinputvalidation/">Prompt input validation</a>, <a href="/goto/modelalignment/">Model alignment</a></td></tr>
<tr>                                         <td><a href="/goto/indirectpromptinjection/">Indirect prompt injection</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/promptinputvalidation/">Prompt input validation</a>, <a href="/goto/inputsegregation/">Input segregation</a></td></tr>
<tr>                                         <td><a href="/goto/evasion/">Evasion</a> (e.g. adversarial examples)</td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a> plus:<br><br><a href="/goto/detectoddinput/">Detect odd input</a>, <a href="/goto/detectadversarialinput/">detect adversarial input</a>, <a href="/goto/evasionrobustmodel/">evasion robust model</a>, <a href="/goto/trainadversarial/">train adversarial</a>, <a href="/goto/inputdistortion/">input distortion</a>, <a href="/goto/adversarialrobustdistillation/">adversarial robust distillation</a></td></tr>
<tr>                                         <td>Runtime - Break into deployed model</td><td><a href="/goto/runtimemodelpoison/">Model poisoning runtime</a> (reprogramming)</td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/runtimemodelintegrity/">Runtime model integrity</a>, <a href="/goto/runtimemodeliointegrity/">runtime model input/output integrity</a></td></tr>
<tr><td rowspan="2">Development -Engineering environment</td><td><a href="/goto/devmodelpoison/">Development-environment model poisoning</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a>, <a href="/goto/supplychainmanage/">supply chain management</a> plus:<br><br><a href="/goto/modelensemble/">model ensemble</a></td></tr>
<tr>                                         <td><a href="/goto/datapoison/">Data poisoning of train/finetune data</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>, <a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a>, <a href="/goto/supplychainmanage/">supply chain management</a> plus:<br><br><a href="/goto/modelensemble/">model ensemble</a> plus:<br><br><a href="/goto/moretraindata/">More training data</a>, <a href="/goto/dataqualitycontrol/">data quality control</a>, <a href="/goto/traindatadistortion/">train data distortion</a>, <a href="/goto/poisonrobustmodel/">poison robust model</a>, <a href="/goto/trainadversarial/">train adversarial</a></td></tr>
<tr><td>Development - Supply chain</td><td><a href="/goto/supplymodelpoison/">Supply-chain model poisoning</a></td><td><a href="/goto/limitunwanted/">Limit unwanted behavior</a>,<br>Supplier: <a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a><br><br>Producer: <a href="/goto/supplychainmanage/">supply chain management</a> plus:<br><br><a href="/goto/modelensemble/">model ensemble</a></td></tr>
<tr><td rowspan="3">Training data Confidentiality</td><td rowspan="2">Runtime - Model use</td><td><a href="/goto/disclosureuseoutput/">Data disclosure in model output</a></td><td><a href="/goto/datalimit/">Sensitive data limitation</a> (data minimize, short retain, obfuscate training data) plus:<br><br><a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a> plus:<br><br><a href="/goto/filtersensitivemodeloutput/">Filter sensitive model output</a></td></tr>
<tr><td><a href="/goto/modelinversionandmembership/">Model inversion / Membership inference</a></td><td><a href="/goto/datalimit/">Sensitive data limitation</a> (data minimize, short retain, obfuscate training data) plus:<br><br><a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a> plus:<br><br><a href="/goto/obscureconfidence/">Obscure confidence</a>, <a href="/goto/smallmodel/">Small model</a></td></tr>
<tr><td>Development - Engineering environment</td><td><a href="/goto/devdataleak/">Training data leaks</a></td><td><a href="/goto/datalimit/">Sensitive data limitation</a> (data minimize, short retain, obfuscate training data) plus:<br><br><a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a></td></tr>
<tr><td rowspan="3">Model confidentiality</td><td>Runtime - Model use</td><td><a href="/goto/modeltheftuse/">Model theft through use</a> (input-output harvesting)</td><td><a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a></td></tr>
<tr><td>Runtime - Break into deployed model</td><td><a href="/goto/runtimemodeltheft/">Direct model theft runtime</a></td><td><a href="/goto/runtimemodelconfidentiality/">Runtime model confidentiality</a>, <a href="/goto/modelobfuscation/">Model obfuscation</a></td></tr>
<tr><td>Development - Engineering environment</td><td><a href="/goto/devmodelleak/">Model theft development-time</a></td><td><a href="/goto/devsecurity/">Development environment security</a>, <a href="/goto/segregatedata/">data segregation</a>, <a href="/goto/federatedlearning/">federated learning</a></td></tr>
<tr><td>Model behaviour Availability</td><td>Model use</td><td><a href="/goto/denialmodelservice/">Denial of model service</a> (model resource depletion)</td><td><a href="/goto/monitoruse/">Monitor</a>, <a href="/goto/ratelimit/">rate limit</a>, <a href="/goto/modelaccesscontrol/">model access control</a> plus:<br><br><a href="/goto/dosinputvalidation/">Dos input validation</a>, <a href="/goto/limitresources/">limit resources</a></td></tr>
<tr><td>Model input data Confidentialiy</td><td>Runtime - All IT</td><td><a href="/goto/leakinput/">Model input leak</a></td><td><a href="/goto/modelinputconfidentiality/">Model input confidentiality</a></td></tr>
<tr><td>Any asset, CIA</td><td>Runtime-All IT</td><td><a href="/goto/insecureoutput/">Model output contains injection</a></td><td><a href="/goto/encodemodeloutput/">Encode model output</a></td></tr>
<tr><td>Any asset, CIA</td><td>Runtime - All IT</td><td>Conventional runtime security attack on conventional asset</td><td>Conventional runtime security controls</td></tr>
<tr><td>Any asset, CIA</td><td>Runtime - All IT</td><td>Conventional attack on conventional supply chain</td><td>Conventional supply chain management controls</td></tr>
</tbody></table>


### Structure of threats and controls in the deep dive section
>Category: discussion  
>Permalink: https://owaspai.org/goto/navigator/

The next big section in this document is an extensive deep dive into all the AI security threats and their controls.  
The navigator diagram below outlines the structure of the deep-dive section, illustrating the relationships between threats, controls, associated risks, and the types of controls applied. 
{{< callout type="info" >}}
  Click on the image to get a PDF with clickable links.
{{< /callout >}}
[![](/images/owaspaioverviewv2.png)](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/raw/main/assets/images/owaspaioverviewpdfv3.pdf)

---

## How to select relevant threats and controls? risk analysis
>Category: discussion  
>Permalink: https://owaspai.org/goto/riskanalysis/

There are quite a number of threats and controls described in this document. The relevance and severity of each threat and the appropriate controls depend on your specific use case and how AI is deployed within your environment. Determining which threats apply, to what extent, and who is responsible for implementing controls should be guided by a risk assessment based on your architecture and intended use. Simply go to the 'Identifying risks' section below and follow the steps.

**Risk management introduction**  
Organizations classify their risks into several key areas: Strategic, Operational, Financial, Compliance, Reputation, Technology, Environmental, Social, and Governance (ESG). A threat becomes a risk when it exploits one or more vulnerabilities. AI threats, as discussed in this resource, can have significant impact across multiple risk domains. For example, adversarial attacks on AI systems can lead to disruptions in operations, distort financial models, and result in compliance issues.  See the [AI security matrix](/goto/aisecuritymatrix/) for an overview of AI related threats, risks and potential impact.

General risk management for AI systems is typically driven by AI governance - see [AIPROGRAM](/goto/aiprogram/) and includes both risks BY relevant AI systems and risks to those systems. Security risk assessment is typically driven by the security management system - see [SECPROGRAM](/goto/secprogram) as this system is tasked to include AI assets, AI threats, and AI systems provided that these have been added to the corresponding repositories.

Organizations often adopt a Risk Management framework, commonly based on ISO 31000 or similar standards such as ISO 23894. These frameworks guide the process of managing risks through four key steps as outlined below:

1. **Identifying  Risks**: Recognizing potential risks that could impact the organization.  See “Threat through use” section to identify potential risks.
2. **Evaluating Risks by Estimating Likelihood and Impact**: To determine the severity of a risk, it is necessary to assess the probability of the risk occurring and evaluating the potential consequences should the risk materialize. Combining likelihood and impact to gauge the risk's overall severity.  This is typically presented in the form of a heatmap. This is discussed in more detail in the sections that follow.  
3. **Deciding What to Do (Risk Treatment)**: Choosing an appropriate strategy to address the risk. These strategies include: Risk Mitigation, Transfer, Avoidance, or Acceptance. See below for further details.
4. **Risk Communication and Monitoring**: Regularly sharing risk information with stakeholders to ensure awareness and continuous support for risk management activities. Ensuring effective Risk Treatments are applied. This requires a Risk Register, a comprehensive list of risks and their attributes (e.g. severity, treatment plan, ownership, status, etc). This is discussed in more detail in the sections that follow.  

Let's go through the risk management steps one by one.

### 1. Identifying  Risks
Discovering potential risks that could impact the organization requires technical and business assessment of the applicable threats. The following section outlines a method to address each type of risk impact individually:

**Unwanted model behaviour**

  Regarding model behaviour, we focus on manipulation by attackers, as the scope of this document is security. Other sources of unwanted behaviour are general inaccuracy (e.g. hallucinations) and/or unwanted bias regarding certain groups (discrimination).
    
  This will always be an applicable threat, independent of your use-case, although the risk level may sometimes be accepted as shown below.

  This means that you always need to have in place the following:
  - [General governance controls](/goto/governancecontrols/) (e.g. maintaining a documented inventory of AI applications and implementing mechanisms to ensure appropriate oversight and accountability.)
  - [Controls to limit effects of unwanted model behaviour](/goto/limitunwanted/) (e.g. human oversight)

  Is the model GenAI (e.g. a Large Language Model)? 
  - Prevent [prompt injection](/goto/directpromptinjection/) (mostly done by the model supplier). When untrusted input goes directly into a model (e.g. any user can talk to your chatbot), and there's a possibility that the model's output could be harmful (for example, by offending, providing dangerous information, or spreading misinformation, or output that triggers harmful functions (Agentic AI) )- it can be a significant concern. This is particularly the case if model input comes from end-users and output goes straight to them, or can trigger functions. The question becomes: has the model supplier done enough according to your risk appetite. For this, you can check tests that the supplier or others have performed tests and when not available: do these tests yourself. What you accept depends on your context. If a user wants the AI to say something offensive: do you regard it as a problem if that user succeeds in getting offended? Do you regard it as a problem if users can get a recipe to make poison - given that they can get this from many AI's out there. See the linked threat section for more details.
  - Prevent [indirect prompt injection](/goto/indirectpromptinjection/), in case your system inserts untrusted data in a prompt e.g. you retrieve somebody's resume and include it in a prompt.

  Sometimes model training and running the model is deferred to a supplier. For generative AI, training is mostly performed by an external supplier because it is expensive and often costs millions of dollars. Finetuning of generative AI is also not often performed by organizations given the cost of compute and the complexity involved. Some GenAI models can be obtained and run on your own infrastructure. The reasons for this could be lower cost (if it is an open source model), and the fact that sensitive input information does not have to be sent externally. A reason to use an externally hosted GenAI model can be the quality of the model.
    
  Who trains/finetunes the model?
  - The supplier: you need to avoid [Supply chain model poisoning](/goto/supplymodelpoison/): obtaining or working with a model that has been manipulated to behave in unintended ways. This is done through proper [supply chain management](/goto/supplychainmanage/) (by selecting a trustworthy supplier and verifying the authenticity of the model). This is to ensure that the supplier prevents model poisoning during development, including data poisoning, and uses uncompromised data. If the risk of data poisoning remains unacceptable, implementing post-training countermeasures can be an option if you have the expertise, and if you have access to the model parameters (e.g. open source weights). See [POISONROBUSTMODEL](/goto/poisonrobustmodel/).
  - You: you need to prevent [development-time model poisoning](/goto/modelpoison/) which includes model poisoning, data poisoning and obtaining poisoned data or a poisoned pre-trained model in case you're finetuning the model.
 
  Do you use RAG (Retrieval Augmented Generation using GenAI) ?
  Yes: Then your retrieval repository plays a role in determining the model behaviour. This means:
  - You need to prevent [data poisoning](/goto/datapoison/) of your retrieval repository, which includes preventing that it contains externally obtained poisoned data.

  Who runs the model?
  - The supplier: select a trusthworthy supplier through [supply chain management](/goto/supplychainmanage/), to make sure the deployed model cannot be manipulated ([runtime model poisoning](/goto/runtimemodelpoison/)) - just the way you would expect any supplier to protect their running application from manipulation
  - You: You need to prevent [runtime model poisoning](/goto/runtimemodelpoison/) where attackers change the model that you have deployed.

  Is the model (predictive AI or Generative AI) used in a judgement task (e.g. spam detection)?
  - Yes: Prevent an [evasion attack](/goto/evasion/) in which a user tries to fool the model into a wrong decision using data (not instructions). Here, the level of risk is an important aspect to evaluate - see below. The risk of an evasion attack may be acceptable.
    
  In order to assess the level of risk for unwanted model behaviour through manipulation, consider what the motivation of an attacker could be. What could an attacker gain by for example sabotaging your model? Just a claim to fame? Could it be a disgruntled employee? Maybe a competitor? What could an attacker gain by a less conspicuous model behaviour attack, like an evasion attack or data poisoning with a trigger? Is there a scenario where an attacker benefits from fooling the model? An example where evasion IS interesting and possible: adding certain words in a spam email so that it is not recognized as such. An example where evasion is not interesting is when a patient gets a skin disease diagnosis based on a picture of the skin. The patient has no interest in a wrong decision, and also the patient typically has no control - well maybe by painting the skin. There are situations in which this CAN be of interest for the patient, for example to be eligible for compensation in case the (faked) skin disease was caused by certain restaurant food. This demonstrates that it all depends on the context whether a theoretical threat is a real threat or not. Depending on the probability and impact of the threats, and on the relevant policies, some threats may be accepted as risk. When not accepted, the level of risk is input to the strength of the controls. For example: if data poisoning can lead to substantial benefit for a group of attackers, then the training data needs to be get a high level of protection.

 **Leaking training data**

  Do you train/finetune the model yourself?
  - If yes, is the training data sensitive? If your response is in the affirmative, you need to prevent:
    - [unwanted disclosure in model output](/goto/disclosureuse/)
    - [model inversion](/goto/modelinversionandmembership/) (but not for GenAI)
    - [training data leaking from your engineering environment](/goto/devdataleak/).
    - [membership inference]((/goto/modelinversionandmembership/)) - but only in the event where something or someone that was part of the training data constitutes sensitive information. For example, when the training set consists of criminals and their history to predict criminal careers. Membership of that set gives away the person is a convicted or alleged criminal.
    
   If you use RAG: apply the above to your repository data, as if it was part of the training set: as the repository data feeds into the model and can therefore be part of the output as well.

  If you don't train/finetune the model, then the supplier of the model is responsible for unwanted content in the training data. This can be poisoned data (see above), data that is confidential, or data that is copyrighted. It is important to check licenses, warranties and contracts for these matters, or accept the risk based on your circumstances.


 **Model theft**

  Do you train/finetune the model yourself?
  - If yes, is the model regarded as  intellectual property? Then you need to prevent:
    - [Model theft through use](/goto/modeltheftuse/)
    - [Model theft development-time](/goto/devmodelleak/)
    - [Source code/configuration leak](/goto/devcodeleak/)
    - [Runtime model theft](/goto/runtimemodeltheft/)
      
 **Leaking input data**
 
  Is your input data sensitive?
  - Prevent [leaking input data](/goto/leakinput/). Especially if the model is run by a supplier, proper care needs to be taken to ensure that this data is minimized and transferred or stored securely. Review the security measures provided by the supplier, including any options to disable logging or monitoring on their end. Realise that most Cloud AI models have your input and output unencrypted in their infrastructure (just like Google and Microsoft 365). If you use the right license and configuration you can prevent it being stored or analysed. One risk that remains is that the government of the supplier may force to store and keep input and output to serve for subpoenas. If you're using a RAG system, remember that the data you retrieve and inject into the prompt also counts as input data. This often includes sensitive company information or personal data.


 **Misc.**

  Is your model a Large Language Model?
  - Prevent [insecure output handling](/goto/insecureoutput/), for example, when you display the output of the model on a website and the output contains malicious Javascript.

  Make sure to prevent [model inavailability by malicious users](/denialmodelservice/) (e.g. large inputs, many requests). If your model is run by a supplier, then certain countermeasures may already be in place to address this.

  Since AI systems are software systems, they require appropriate conventional application security and operational security, apart from the AI-specific threats and controls mentioned in this section.

### 2. Evaluating Risks by Estimating Likelihood and Impact
To determine the severity of a risk, it is necessary to assess the probability of the risk occurring and evaluating the potential consequences should the risk materialize.

**Estimating the Likelihood:**  
Estimating the likelihood and impact of an AI risk requires a thorough understanding of both the technical and contextual aspects of the AI system in scope. The likelihood of a risk occurring in an AI system is influenced by several factors, including the complexity of the AI algorithms, the data quality and sources, the conventional security measures in place, and the potential for adversarial attacks. For instance, an AI system that processes public data is more susceptible to data poisoning and inference attacks, thereby increasing the likelihood of such risks.  A financial institution's AI system, which assesses loan applications using public credit scores, is exposed to data poisoning attacks. These attacks could manipulate creditworthiness assessments, leading to incorrect loan decisions. 

**Evaluating the Impact:**
Evaluating the impact of risks in AI systems involves understanding the potential consequences of threats materializing. This includes both the direct consequences, such as compromised data integrity or system downtime, and the indirect consequences, such as reputational damage or regulatory penalties. The impact is often magnified in AI systems due to their scale and the critical nature of the tasks they perform. For instance, a successful attack on an AI system used in healthcare diagnostics could lead to misdiagnosis, affecting patient health and leading to significant legal, trust, and reputational repercussions for the involved entities.

**Prioritizing risks**
The combination of likelihood and impact assessments forms the basis for prioritizing risks and informs the development of Risk Treatment decisions. Commonly, organizations use a risk heat map to visually categorize risks by impact and likelihood. This approach facilitates risk communication and  decision-making.  It allows the management to focus on risks with highest severity (high likelihood and high impact). 

### 3. Risk Treatment
Risk treatment is about deciding what to do with the risks. It involves selecting and implementing measures to mitigate, transfer, avoid, or accept cybersecurity risks associated with AI systems.  This process is critical due to the unique vulnerabilities and threats related to AI systems such as  data poisoning, model theft, and adversarial attacks. Effective risk treatment is essential to robust, reliable, and trustworthy AI.

Risk Treatment options are:
  1. **Mitigation**: Implementing controls to reduce the likelihood or impact of a risk. This is often the most common approach for managing AI cybersecurity risks. See the many controls in this resource and the 'Select controls' subsection below.  
    - Example: Enhancing data validation processes to prevent data poisoning attacks, where malicious data is fed into the Model to corrupt its learning process and negatively impact its performance.
  2. **Transfer**: Shifting the risk to a third party, typically through transfer learning, federated learning, insurance or outsourcing certain functions. 
    - Example: Using third-party cloud services with robust security measures for AI model training, hosting, and data storage, transferring the risk of data breaches and infrastructure attacks.
  3. **Avoidance**: Changing plans or strategies to eliminate the risk altogether. This may involve not using AI in areas where the risk is deemed too high.
    - Example: Deciding against deploying an AI system for processing highly sensitive personal data where the risk of data breaches cannot be adequately mitigated.
  4. **Acceptance**: Acknowledging the risk and deciding to bear the potential loss without taking specific actions to mitigate it. This option is chosen when the cost of treating the risk outweighs the potential impact.
    - Example: Accepting the minimal risk of model inversion attacks (where an attacker attempts to reconstruct publicly available input data from model outputs) in non-sensitive applications where the impact is considered low.

### 4. Risk Communication & Monitoring
Regularly sharing risk information with stakeholders to ensure awareness and support for risk management activities. 

A central tool in this process is the Risk Register, which serves as a comprehensive repository of all identified risks, their attributes (such as severity, treatment plan, ownership, and status), and the controls implemented to mitigate them.  Most large organizations already have such a Risk Register.  It is important to align AI risks and chosen vocabularies from Enterprise Risk Management to facilitate effective communication of risks throughout the organization.  

### 5. Arrange responsibility
For each selected threat, determine who is responsible for addressing it. By default, the organization that builds and deploys the AI system is responsible, but building and deploying may be done by different organizations, and some parts of the building and deployment may be deferred to other organizations, e.g. hosting the model, or providing a cloud environment for the application to run. Some aspects are shared responsibilities.

If some components of your AI system are hosted, then you share responsibility regarding all controls for the relevant threats with the hosting provider. This needs to be arranged with the provider by using a tool like the responsibility matrix. Components can be the model, model extensions, your application, or your infrastructure. See [Threat model of using a model as-is](#threat-model-with-controls---genai-as-is).

If an external party is not open about how certain risks are mitigated, consider requesting this information and when this remains unclear you are faced with either 1) accept the risk, 2) or provide your own mitigations, or 3) avoid the risk, by not engaging with the third party.

### 6. Verify external responsibilities
For the threats that are the responsibility of other organisations: attain assurance whether these organisations take care of it. This would involve the controls that are linked to these threats.

Example: Regular audits and assessments of third-party security measures.
 
### 7. Select controls
Next, for the threats that are relevant to your use-case and fall under your responsibility, review the associated controls, both those listed directly under the threat (or its parent category) and the general controls, which apply universally. For each control, consider its purpose and assess whether it's worth implementing, and to what extent. This decision should weigh the cost of implementation against how effectively the control addresses the threat, along with the severity of the associated risk. These factors also influence the order in which you apply controls. Start with the highest-risk threats and prioritize low-cost, quick-win controls (the "low-hanging fruit").

Controls often have quality-related parameters that need to be adjusted to suit the specific situation and level of risk. For example, this could involve deciding how much noise to add to input data or setting appropriate thresholds for anomaly detection. Testing the effectiveness of these controls in a simulation environment helps you evaluate their performance and security impact to find the right balance. This tuning process should be continuous, using insights from both simulated tests and real-world production feedback.

### 8. Residual risk acceptance
In the end you need to be able to accept the risks that remain regarding each threat, given the controls that you implemented. The severity level of the risks you deem aceptable should be significantly low to the point where it won't hurt your business on any front.

### 9. Further management of the selected controls
(see [SECPROGRAM](/goto/secprogram/)), which includes continuous monitoring, documentation, reporting, and incident response.

### 10. Continuous risk assessment
Implement continuous monitoring to detect and respond to new threats. Update the risk management strategies based on evolving threats and feedback from incident response activities.  
Example: Regularly reviewing and updating risk treatment plans to adapt to new vulnerabilities.

---

## How about ...
### How about AI outside of machine learning?
A helpful way to look at AI is to see it as consisting of machine learning (the current dominant type of AI) models and _heuristic models_. A model can be a machine learning model which has learned how to compute based on data, or it can be a heuristic model engineered based on human knowledge, e.g. a rule-based system. Heuristic models still require data for testing, and in some cases, for conducting analysis that supports further development and validation of human-derived knowledge.  
This document focuses on machine learning. Nevertheless, here is a quick summary of the machine learning threats from this document that also apply to heuristic systems:

- Model evasion is also possible with heuristic models, as attackers may try to find loopholes or weaknesses in the defined rules.
- Model theft through use - it is possible to train a machine learning model based on input/output combinations from a heuristic model
- Overreliance in use - heuristic systems can also be relied on too much. The applied knowledge can be false
- Both data poisoning and model poisoning can occur by tampering with the data used to enhance knowledge, or by manipulating the rules either during development or at runtime.
- Leaks of data used for analysis or testing can still be an issue
- Knowledge base, source code and configuration can be regarded as sensitive data when it is intellectual property, so it needs protection
- Leak sensitive input data, for example when a heuristic system needs to diagnose a patient

### How about responsible or trustworthy AI?
> Category: discussion  
> Permalink: https://owaspai.org/goto/responsibleai/

There are many aspects of AI when it comes to positive outcome while mitigating risks. This is often referred to as responsible AI or trustworthy AI, where the former emphasises ethics, society, and governance, while the latter emphasises the more technical and operational aspects.

If your primary responsibility is security, it's best to start by focusing on AI security. Once you have a solid grasp of that, you can expand your knowledge to other AI aspects, even if it's just to support colleagues who are responsible for those areas and help them stay vigilant. After all, security professionals are often skilled at spotting potential failure points. Furthermore, some aspects can be a consequence of compromised AI and are therefore helpful to understand, such as _safety_.

Let's break down the principles of AI and explore how each one connects to security:
- **Accuracy** is about the AI model being sufficiently correct to perform its 'business function'. Being incorrect can lead to harm, including (physical) safety problems (e.g. car trunk opens during driving) or other wrong decisions that are harmful (e.g. wrongfully declined loan). The link with security is that some attacks cause unwanted model behaviour which is by definition, an accuracy problem. Nevertheless, the security scope is restricted to mitigating the risks of those attacks - NOT solve the entire problem of creating an accurate model (selecting representative data for the trainset etc.).
- **Safety**  refers to the condition of being protected from / unlikely to cause harm. Therefore safety of an AI system is about the level of accuracy when there is a risk of harm (typically implying physical harm but not restricted to that) , plus the things that are in place to mitigate those risks (apart from accuracy), which includes security to safeguard accuracy, plus a number of safety measures that are important for the business function of the model. These need to be taken care of and not just for security reasons because the model can make unsafe decisions for other reasons (e.g. bad training data), so they are a shared concern between safety and security:
  -  [oversight](/goto/oversight/) to restrict unsafe behaviour, and connected to that: assigning least privileges to the model,
  -  [continuous validation](/goto/continuousvalidation/) to safeguard accuracy,
  -  [transparency](/goto/aitransparency/): see below,
  -  [explainability](/goto/continuousvalidation/): see below.
- **Transparency**: sharing information about the approach, to warn users and depending systems of accuracy risks, plus in many cases users have the right to know details about a model being used and how it has been created. Therefore it is a shared concern between security, privacy and safety.
- **Explainability**: sharing information to help users validate accuracy by explaining in more detail how a specific result came to be. Apart from validating accuracy this can also support users to get transparency and to understand what needs to change to get a different outcome. Therefore it is a shared concern between security, privacy, safety and business function. A special case is when explainability is required by law separate from privacy, which adds 'compliance' to the list of aspects that share this concern.
- **Robustness** is about the ability of maintaining accuracy under expected or unexpected variations in input. The security scope is about when those variations are malicious (_adversarial robustness_) which often requires different countermeasures than those required against normal variations (_generalization robustness). Just like with accuracy, security is not involved per se in creating a robust model for normal variations. The exception is when generalization robustness or adversarial robustness is involved, as this becomes a shared concern between safety and security. Whether it falls more under one or the other depends on the specific case.
- **Free of discrimination**: without unwanted bias of protected attributes, meaning: no systematic inaccuracy where the model 'mistreats' certain groups (e.g. gender, ethnicity). Discrimination is undesired for legal and ethical reasons. The relation with security is that having detection of unwanted bias can help to identify unwanted model behaviour caused by an attack. For example, a data poisoning attack has inserted malicious data samples in the training set, which at first goes unnoticed, but then is discovered by an unexplained detection of bias in the model. Sometimes the term 'fairness' is used to refer to discrimination issues, but mostly fairness in privacy is a broader term referring to fair treatment of individuals, including transparency, ethical use, and privacy rights.
- **Empathy**. Its connection to security lies in recognizing the practical limits of what security can achieve when evaluating an AI application. If individuals or organizations cannot be adequately protected, empathy means rethinking the idea, either by rejecting it altogether or by taking additional precautions to reduce potential harm.
- **Accountability**. The relation of accountability with security is that security measures should be demonstrable, including the process that have led to those measures. In addition, traceability as a security property is important, just like in any IT system, in order to detect, reconstruct and respond to security incidents and provide accountability.
- **AI security**. The security aspect of AI is the central topic of the AI Exchange. In short, it can be broken down into:
  - [Input attacks](/goto/threatsuse/), that are performed by providing input to the model
  - [Model poisoning](/goto/modelpoison/), aimed to alter the model's behavior
  - Stealing AI assets, such as train data, model input, output, or the model itself, either [development time](/goto/devleak/) or runtime (see below)
  - Further [runtime conventional security attacks](/goto/generalappsecthreats/)
 
[![](/images/aiwayfinder.png)](/images/aiwayfinder.png)

### How about Generative AI (e.g. LLM)?
> Category: discussion  
> Permalink: https://owaspai.org/goto/genai/

Yes, GenAI is leading the current AI revolution and it's the fastest moving subfield of AI security. Nevertheless it is important to realize that other types of algorithms (let's call it _predictive AI_) will remain to be applied to many important use cases such as credit scoring, fraud detection, medical diagnosis, product recommendation, image recognition, predictive maintenance, process control, etc. Relevant content has been marked with 'GenAI' in this document.

Important note: from a security threat perspective, GenAI is not that different from other forms of AI (_predictive AI_). GenAI threats and controls largely overlap and are very similar to AI in general. Nevertheless, some risks are (much) higher. Some are lower. Only a few risks are GenAI-specific. Some of the control categories differ substantially between GenAI and predictive AI - mostly the data science controls (e.g. adding noise to the training set). In many cases, GenAI solutions will use a model as-is and not involve any training by the organization whatsoever, shifting some of the security responsibilities from the organization to the supplier. Nevertheless, if you use a ready-made model, you need still to be aware of those threats.

What is mainly new to the threat landscape because of LLMs?  
- First of all, LLMs pose new threats to security because they may be used to create code with vulnerabilities, or they may be used by attackers to create malware, or they may cause harm through hallucinations. However, these concerns are outside the scope of the AI Exchange, which focuses on security threats to AI systems themselves.
- Regarding input:
  - Prompt injection is when attackers manipulate the behaviour of the model with crafted and sometimes hidden instructions.
  - Also new is organizations sending huge amounts of data in prompts, with company secrets and personal data.
- Regarding output: The fact that output can contain injection attacks, or can contain sensitive or copyrighted data is new (see [Copyright](/goto/copyright/)).
- Overreliance is an issue. We let LLMs control and create things and may have too much trust in how correct they are, and also underestimate the risk of them being manipulated. The result is that attacks can have much impact.
- Regarding training: Since the training sets are so large and based on public data, it is easier to perform data poisoning. Poisoned foundation models are also a big supply chain issue.
- Just like any AI system, a generative AI system can trigger actions based on the output, but in the case of generative AI, the model output can contain function calls to perform actions (e.g. send mail) or trigger other AI systems. See [Agentic AI](/goto/agenticAIthreats/) for more details.

GenAI security particularities are:

|Nr.| GenAI security particularities |OWASP for LLM TOP 10|
|-| ----------|-------------------|
|1| GenAI models are controlled by natural language in prompts, creating the risk of [Prompt injection](/goto/promptinjection/). Direct prompt injection is where the user tries to fool the model to behave in unwanted ways (e.g. offensive language), whereas with indirect prompt injection it is a third party that injects content into the prompt for this purpose (e.g. manipulating a decision). |  ([OWASP for LLM 01:Prompt injection](https://genai.owasp.org/llmrisk/llm01/))  | 
|2| GenAI models have typically been trained on very large datasets, which makes it more likely to output [sensitive data](/goto/disclosureuseoutput/) or [licensed data](/goto/copyright/), for which there is no control of access privileges built into the model. All data will be accessible to the model users. Some mechanisms may be in place in terms of system prompts or output filtering, but those are typically not watertight. |  ([OWASP for LLM 02: Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm02/))  | 
|3|[Data and model poisoning](/goto/modelpoison/) is an AI-broad problem, and with GenAI the risk is generally higher since training data can be supplied from different sources that may be challenging to control, such as the internet. Attackers could for example hijack domains and place manipulated information. | ([OWASP for LLM 04: Data and Model Poisoning](https://genai.owasp.org/llmrisk/llm04/))|
|4|GenAI models can be inaccurate and hallucinate. This is an AI-broad risk factor, and Large Language Models (GenAI) can make matters worse by coming across as very confident and knowledgeable. In essence, this is about the risk of underestimating the probability that the model is wrong or the model has been manipulated. This means that it is connected to each and every security control. The strongest link is with [controls that limit the impact of unwanted model behavior](/goto/limitunwanted/), in particular [Least model privilege](/goto/leastmodelprivilege/).  |([OWASP for LLM 06: Excessive agency](https://genai.owasp.org/llmrisk/llm06/)) and ([OWASP for LLM 09: Misinformation](https://genai.owasp.org/llmrisk/llm09/)) |
|5| [Leaking input data](/goto/leakinput/): GenAI models mostly live in the cloud - often managed by an external party, which may increase the risk of leaking training data and leaking prompts. This issue is not limited to GenAI, but GenAI has 2 particular risks here: 1) model use involves user interaction through prompts, adding user data and corresponding privacy/sensitivity issues, and 2) GenAI model input (prompts) can contain rich context information with sensitive data (e.g. company secrets). The latter issue occurs with *in context learning* or *Retrieval Augmented Generation(RAG)* (adding background information to a prompt): for example data from all reports ever written at a consultancy firm. First of all, this information will travel with the prompt to the cloud, and second: the system will likely not respect the original access rights to the information.| Not covered in LLM top 10 |
|6|Pre-trained models may have been manipulated. The concept of pretraining is not limited to GenAI, but the approach is quite common in GenAI, which increases the risk of [supply-chain model poisoning](/goto/supplymodelpoison/).| ([OWASP for LLM 03 - Supply chain vulnerabilities](https://genai.owasp.org/llmrisk/llm03/))|
|7|[Model inversion and membership inference](/goto/modelinversionandmembership/) are typically low to zero risks for GenAI |Not covered in LLM top 10, apart from LLM06 which uses a different approach - see above|
|8|GenAI output may contain elements that perform an [injection attack](/goto/insecureoutput/) such as cross-site-scripting.| ([OWASP for LLM 05: Improper Output Handling](https://genai.owasp.org/llmrisk/llm05/))|
|9|[Denial of service](/goto/denialmodelservice/) can be an issue for any AI model, but GenAI models typically cost more to run, so overloading them can create unwanted cost. | ([OWASP for LLM 10: Unbounded consumption](https://genai.owasp.org/llmrisk/llm10/)) |

GenAI References:

- [OWASP LLM top 10](https://llmtop10.com/)
- [Demystifying the LLM top 10](https://blog.kloudzone.co.in/demystifying-the-owasp-top-10-for-large-language-model-applications/)
- [Impacts and risks of GenAI](https://arxiv.org/pdf/2306.13033.pdf)
- [LLMsecurity.net](https://llmsecurity.net/)

### How about the NCSC/CISA guidelines?
>Category: discussion  
>Permalink: https://owaspai.org/goto/jointguidelines/

Mapping of the UK NCSC /CISA [Joint Guidelines for secure AI system development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development) to the controls here at the AI Exchange.  
To see those controls linked to threats, refer to the [Periodic table of AI security](/goto/periodictable/).  

Note that the UK Government drove an initiative through their DSIT department to build on these joint guidelines and produce the [DSIT Code of Practice for the Cyber Security of AI](https://www.gov.uk/government/publications/ai-cyber-security-code-of-practice/code-of-practice-for-the-cyber-security-of-ai#code-of-practice-principles), which reorganizes things according to 13 principles, does a few tweaks, and adds a bit more of governance. The principle mapping is added below, and adds mostly post-market aspects:
- Principle 10: Communication and processes assoiated with end-users and affected entities
- Principle 13: Ensure proper data and model disposal


1. Secure design

- Raise staff awareness of threats and risks (DSIT principle 1):  
  #[SECURITY EDUCATE](/goto/seceducate/)
- Model the threats to your system (DSIT principle 3):  
  See Risk analysis under #[SECURITY PROGRAM](/goto/secprogram/)
- Design your system for security as well as functionality and performance (DSIT principle 2):  
  #[AI PROGRAM](/goto/aiprogram/ ), #[SECURITY PROGRAM](/goto/secprogram/), #[DEVELOPMENT PROGRAM](/goto/devprogram/), #[SECURE DEVELOPMENT PROGRAM](/goto/secdevprogram/), #[CHECK COMPLIANCE](/goto/checkcompliance/), #[LEAST MODEL PRIVILEGE](/goto/leastmodelprivilege/), #[DISCRETE](/goto/discrete/), #[OBSCURE CONFIDENCE](/goto/obscureconfidence/), #[OVERSIGHT](/goto/oversight/), #[RATE LIMIT](/goto/ratelimit/),  #[DOS INPUT VALIDATION](/goto/dosinputvalidation/), #[LIMIT RESOURCES](/goto/limitresources/), #[MODEL ACCESS CONTROL](/goto/modelaccesscontrol/), #[AI TRANSPARENCY](/goto/aitransparency)
- Consider security benefits and trade-offs when selecting your AI model  
  All development-time data science controls (currently 13), #[EXPLAINABILITY](/goto/explainability/)

2. Secure Development

- Secure your supply chain (DSIT principle 7):  
  #[SUPPLY CHAIN MANAGE](/goto/supplychainmanage/)
- Identify, track and protect your assets (DSIT principle 5):  
  #[DEVELOPMENT SECURITY](/goto/devsecurity/), #[SEGREGATE DATA](/goto/segregatedata/), #[CONFIDENTIAL COMPUTE](/goto/confcompute/), #[MODEL INPUT CONFIDENTIALITY](/goto/modelinputconfidentiality/), #[RUNTIME MODEL CONFIDENTIALITY](/goto/runtimemodelconfidentiality/), #[DATA MINIMIZE](/goto/dataminimize/), #[ALLOWED DATA](/goto/alloweddata/), #[SHORT RETAIN](/goto/shortretain/), #[OBFUSCATE TRAINING DATA](/goto/obfuscatetrainingdata/) and part of #[SECURITY PROGRAM](/goto/secprogram/)
- Document your data, models and prompts (DSIT principle 8):  
  Part of #[DEVELOPMENT PROGRAM](/goto/devprogram/)
- Manage your technical debt:  
  Part of #[DEVELOPMENT PROGRAM](/goto/devprogram/)

3. Secure deployment

- Secure your infrastructure (DSIT principle 6):  
  Part of #[SECURITY PROGRAM](/goto/secprogram/) and see ‘Identify, track and protect your assets’
- Protect your model continuously:  
  #[INPUT DISTORTION](/goto/inputdistortion/), #[FILTER SENSITIVE MODEL OUTPUT](/goto/filtersensitivemodeloutput/), #[RUNTIME MODEL IO INTEGRITY](/goto/runtimemodeliointegrity/), #[MODEL INPUT CONFIDENTIALITY](/goto/modelinputconfidentiality/), #[PROMPT INPUT VALIDATION](/goto/promptinputvalidation/), #[INPUT SEGREGATION](/goto/inputsegregation/)
- Develop incident management procedures:  
  Part of #[SECURITY PROGRAM](/goto/secprogram/)
- Release AI responsibly:  
  Part of #[DEVELOPMENT PROGRAM](/goto/devprogram/)
- Make it easy for users to do the right things (DSIT principe 4, called Enable human responsibility for AI systems):  
  Part of #[SECURITY PROGRAM](/goto/secprogram/), and also involving #[EXPLAINABILITY](/goto/explainability/), documenting prohibited use cases, and #[HUMAN OVERSIGHT](/goto/humanoversight))

4. Secure operation and maintenance

- Monitor your system’s behaviour (DSIT principle 12 and similar to DSIT principle 9 - appropriate testing and validation):  
  #[CONTINUOUS VALIDATION](/goto/continuousvalidation/), #[UNWANTED BIAS TESTING](/goto/unwantedbiastesting/)
- Monitor your system’s inputs:  
  #[MONITOR USE](/goto/monitoruse/), #[DETECT ODD INPUT](/goto/detectoddinput/), #[DETECT ADVERSARIAL INPUT](/goto/detectadversarialinput/)
- Follow a secure by design approach to updates (DSIT Principle 11: Maintain regular security updates, patches and mitigations):  
  Part of #[SECURE DEVELOPMENT PROGRAM](/goto/secdevprogram/)
- Collect and share lessons learned:  
  Part of #[SECURITY PROGRAM](/goto/secprogram/) and #[SECURE DEVELOPMENT PROGRAM](/goto/secdevprogram/)


### How about copyright?
>Category: discussion  
>Permalink: https://owaspai.org/goto/copyright/

#### Introduction
AI and copyright are two (of many) areas of law and policy, (both public and 
private), that raise complex and often unresolved questions. AI output or generated 
content is not yet protected by US copyright laws. Many other jurisdictions have yet 
to announce any formal status as to intellectual property protections for such 
materials. On the other hand, the human contributor who provides the input 
content, text, training data, etc. may own a copyright for such materials. Finally, the
usage of certain copyrighted materials in AI training may be considered [fair use](https://en.wikipedia.org/wiki/Fair_use).

#### AI & Copyright Security
In AI, companies face a myriad of security threats that could have far-reaching 
implications for intellectual property rights, particularly copyrights. As AI systems, 
including large data training models, become more sophisticated, they 
inadvertently raise the specter of copyright infringement. This is due in part to the 
need for development and training of AI models that process vast amounts of data, 
which may contain copyright works. In these instances, if copyright works were 
inserted into the training data without the permission of the owner, and without 
consent of the AI model operator or provider, such a breach could pose significant 
financial and reputational risk of infringement of such copyright and corrupt the 
entire data set itself.  

The legal challenges surrounding AI are multifaceted. On one hand, there is the
question of whether the use of copyrighted works to train AI models constitutes 
infringement, potentially exposing developers to legal claims. On the other hand, 
the majority of the industry grapples with the ownership of AI-generated works and 
the use of unlicensed content in training data. This legal ambiguity affects all 
stakeholders including developers, content creators, and copyright owners alike.

#### Lawsuits Related to AI & Copyright
Recent lawsuits (writing is April 2024) highlight the urgency of these issues. For instance, a class 
action suit filed against Stability AI, Midjourney, and DeviantArt alleges infringement
on the rights of millions of artists by training their tools on web-scraped images2.  
Similarly, Getty Images’ lawsuit against Stability AI for using images from its catalog
without permission to train an art-generating AI underscores the potential for 
copyright disputes to escalate. Imagine the same scenario where a supplier 
provides vast quantities of training data for your systems, that has been 
compromised by protected work, data sets, or blocks of materials not licensed or 
authorized for such use. 

#### Copyright of AI-generated source code
Source code constitutes a significant intellectual property (IP) asset of a 
software development company, as it embodies the innovation and creativity
of its developers. Therefore, source code is subject to IP protection, through 
copyrights, patents, and trade secrets. In most cases, human generated 
source code carries copyright status as soon as it is produced.

However, the emergence of AI systems capable of generating source code 
without human input poses new challenges for the IP regime. For instance, 
who is the author of the AI-generated source code? Who can claim the IP 
rights over it? How can AI-generated source code be licensed and exploited 
by third parties?

These questions are not easily resolved, as the current IP legal and 
regulatory framework does not adequately address the IP status of AI-
generated works. Furthermore, the AI-generated source code may not be 
entirely novel, as it may be derived from existing code or data 
sources. Therefore, it is essential to conduct a thorough analysis of the 
origin and the process of the AI-generated source code, to determine its IP 
implications and ensure the safeguarding of the company's IP assets. Legal 
professionals specializing in the field of IP and technology should be 
consulted during the process. 

As an example, a recent case still in adjudication shows the complexities of 
source code copyrights and licensing filed against GitHub, OpenAI, and 
Microsoft by creators of certain code they claim the three entities violated. 
More information is available here: [: GitHub Copilot copyright case narrowed 
but not neutered • The Register](https://www.theregister.com/2024/01/12/github_copilot_copyright_case_narrowed/)

####  Copyright damages indemnification
Note that AI vendors have started to take responsibility for copyright issues of their models, under certain circumstances. Microsoft offers users the so-called [Copilot Copyright Commitment](https://www.microsoft.com/en-us/licensing/news/microsoft-copilot-copyright-commitment), which indemnifies users from legal damages regarding copyright of code that Copilot has produced - provided [a number of things](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/customer-copyright-commitment) including that the client has used content filters and other safety systems in Copilot and uses specific services. Google Cloud offers its [Generative AI indemnification](https://cloud.google.com/blog/products/ai-machine-learning/protecting-customers-with-generative-ai-indemnification).  
Read more at [The Verge on Microsoft indemnification](https://www.theverge.com/2023/9/7/23863349/microsoft-ai-assume-responsibility-copyright-lawsuit) and [Direction Microsoft on the requirements of the indemnification](https://www.directionsonmicrosoft.com/blog/why-microsofts-copilot-copyright-commitment-may-not-mean-much-for-customers-yet/).

#### Do generative AI models really copy existing work?
Do generative AI models really lookup existing work that may be copyrighted? In essence: no. A Generative AI model does not have sufficient capacity to store all the examples of code or pictures that were in its training set. Instead, during training, it extracts patterns about how things work in the data that it sees, and then later, based on those patterns, it generates new content. Parts of this content may show remnants of existing work, but that is more of a coincidence. In essence, a model doesn't recall exact blocks of code, but uses its 'understanding' of coding to create new code. Just like with human beings, this understanding may result in reproducing parts of something you have seen before, but not per se because this was from exact memory. Having said that, this remains a difficult discussion that we also see in the music industry: did a musician come up with a chord sequence because she learned from many songs that this type of sequence works and then coincidentally created something that already existed, or did she copy it exactly from that existing song?

#### Mitigating Risk
Organizations have several key strategies to mitigate the risk of copyright 
infringement in their AI systems. Implementing them early can be much more cost 
effective than fixing at later stages of AI system operations. While each comes with 
certain financial and operating costs, the “hard savings” may result in a positive 
outcome. These may include:  
1. Taking measures to mitigate the output of certain training data. The OWASP AI Exchange covers this through the corresponding threat: [data disclosure through model output](/goto/disclosureuseoutput/).
2. Comprehensive IP Audits: a thorough audit may be used to identify all 
intellectual property related to the AI system as a whole. This does not 
necessarily apply only to data sets but overall source code, systems, 
applications, interfaces and other tech stacks.
3. Clear Legal Framework and Policy: development and enforcement of legal 
policies and procedures for AI use, which ensure they align with current IP 
laws including copyright.
4. Ethics in Data Sourcing: source data ethically, ensuring all date used for 
training the AI models is either created in-house, or obtained with all 
necessary permissions, or is sourced from public domains which provide 
sufficient license for the organization’s intended use.
5. Define AI-Generated Content Ownership: clearly defined ownership of the 
content generated by AI systems, which should include under what conditions
it be used, shared, disseminated.
6. Confidentiality and Trade Secret Protocols: strict protocols will help protect 
confidentiality of the materials while preserving and maintaining trade secret 
status.
7. Training for Employees: training employees on the significance and 
importance of the organization’s AI IP policies along with implications on what
IP infringement may be will help be more risk averse.
8. Compliance Monitoring Systems: an updated and properly utilized monitoring 
system will help check against potential infringements by the AI system.
9. Response Planning for IP Infringement: an active plan will help respond 
quickly and effectively to any potential infringement claims.
10. Additional mitigating factors to consider include seeking licenses and/or warranties 
from AI suppliers regarding the organization’s intended use, as well as all future uses by the AI system. With the 
help of a legal counsel, the organization should also consider other contractually 
binding obligations on suppliers to cover any potential claims of infringement.


#### Helpful resources regarding AI and copyright:
- [Artificial Intelligence (AI) and Copyright | Copyright Alliance](https://copyrightalliance.org/education/artificial-intelligence-copyright/)
- [AI industry faces threat of copyright law in 2024 | Digital Watch  Observatory](https://dig.watch/updates/ai-industry-faces-threat-of-copyright-law-in-2024)
- [Using generative AI and protecting against copyright issues | World    
Economic Forum -weforum.org](https://www.weforum.org/agenda/2024/01/cracking-the-code-generative-ai-and-intellectual-property/)
- [Legal Challenges Against Generative AI: Key Takeaways | Bipartisan    
Policy Center](https://bipartisanpolicy.org/blog/legal-challenges-against-generative-ai-key-takeaways/)
- [Generative AI Has an Intellectual Property Problem - hbr.org](https://hbr.org/2023/04/generative-ai-has-an-intellectual-property-problem)
- [Recent Trends in Generative Artificial Intelligence Litigation in the    
United States | HUB | K&L Gates - klgates.com](https://www.klgates.com/Recent-Trends-in-Generative-Artificial-Intelligence-Litigation-in-the-United-States-9-5-2023)
- [Generative AI could face its biggest legal tests in 2024 | Popular    
Science - popsci.com](https://www.popsci.com/technology/generative-ai-lawsuits/)
- [Is AI Model Training Compliant With Data Privacy Laws? - termly.io](https://termly.io/resources/articles/is-ai-model-training-compliant-with-data-privacy-laws/)
- [The current legal cases against generative AI are just the beginning |    
TechCrunch](https://techcrunch.com/2023/01/27/the-current-legal-cases-against-generative-ai-are-just-the-beginning/?guccounter=1)
- [(Un)fair Use? Copyrighted Works as AI Training Data — AI: The    
Washington Report | Mintz](https://www.mintz.com/insights-center/viewpoints/54731/2024-01-10-unfair-use-copyrighted-works-ai-training-data-ai)
- [Potential Supreme Court clash looms over copyright issues in    
generative AI training data | VentureBeat](https://venturebeat.com/ai/potential-supreme-court-clash-looms-over-copyright-issues-in-generative-ai-training-data/)
- [AI-Related Lawsuits: How The Stable Diffusion Case Could Set a Legal    
Precedent | Fieldfisher](https://www.fieldfisher.com/en/insights/ai-related-lawsuits-how-the-stable-diffusion-case)
