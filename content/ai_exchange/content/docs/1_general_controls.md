---
title: 1. General controls
weight: 2
---
> Category: group of controls  
> Permalink: https://owaspai.org/goto/generalcontrols/
## 1.1 General governance controls
> Category: group of controls  
> Permalink: https://owaspai.org/goto/governancecontrols/

#### #AIPROGRAM
> Category: governance control  
> Permalink: https://owaspai.org/goto/aiprogram/

AI program: Install and execute a program to govern AI. Take responsibility for AI as an organization, by keeping an inventory of AI initiatives, perform risk analysis on them, and manage those risks.  


Purpose: 1) reduces probability of AI initiatives being overlooked for proper governance (including security) - as covered by controls in this document, and 2) increases incentive for proper governance as the AI program takes responsibility for it. Without proper governance, the controls in this document can only happen by accident.

This includes assigning responsibilities, e.g. model accountability, data accountability, and risk governance.  
This governance challenge may seem daunting because of all the new things to take care of, but there are plenty of existing controls in organizations that can be extended to include AI (e.g. policies, risk analysis, impact analysis, inventory of used services etc.).

Technically one could argue that this control is out of scope for cyber security, but it initiates action to get in control of AI security.

When doing risk analysis on AI initiatives, consider at least the following:
- Note that an AI program is not just about risk TO AI, such as security risks - it is also about risks BY AI, such as threats to fairness, safety, etc.
- Include laws and regulations, as the type of AI apllication may be prohibited (e.g. social scoring under the EU AI Act). See #[CHECKCOMPLIANCE](/goto/checkcompliance/)
- Can the required transparency be provided into how the AI works?
- Can the privacy rights be achieved (right to access, erase, correct, update personal data, and the right to object)?
- Can unwanted bias regarding protected groups of people be sufficiently mitigated?
- Is AI really needed to solve the problem?
- Is the right expertise available (e.g. data scientists)?
- Is it allowed to use the data for the purpose - especially if it is personal data collected for a different purpose?
- Can unwanted behaviour be sufficiently contained by mitigations (see Controls to limit unwanted behaviour)?
- See Risk management under [SECPROGRAM](/goto/secprogram/) for security-specific risk analysis, also involving privacy.

In general risk management it may help to keep in mind the following particularities of AI:
1. Inductive instead of deductive, meaning that being wrong is part of the game for machine learning models, which can lead to harm
2. Connected to 1: models can go stale
3. Organizes its behaviour based on data, so data becomes a source of opportunity (e.g. complex real-world problem solving, adaptability) and of risk (e.g. unwanted bias, incompleteness, error, manipulation)
4. Unfamiliar to organizations and to people, with the risk of implementation mistakes, underreliance, overreliance, and incorrect attribution of human tendencies
5. Incomprehensible, resulting in trust issues
6. New technical assets that form security threats (data/model supply chain, train data, model parameters, AI documentation)
7. Can listen and speak: communicate through natural language instead of user interfaces
8. Can hear and see: have sound and vision recognition abilities

Useful standards include:
 - ISO/IEC 42001 AI management system. Gap: covers this control fully.
 - [US Federal Reserve SR 11-07: Guidance on Model Risk Management](https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm): supervisory guidance for banking organizations and supervisors.

42001 is about extending your risk management system - it focuses on governance. ISO 5338 (see #[DEVPROGRAM](#devprogram) below) is about extending your software lifecycle practices - it focuses on engineering and everything around it. ISO 42001 can be seen as a management system for the governance of responsible AI in an organization, similar to how ISO 27001 is a management system for information security. ISO 42001 doesn’t go into the lifecycle processes. It for example does not discuss how to train models, how to do data lineage, continuous validation, versioning of AI models, project planning challenges, and how and when exactly sensitive data is used in engineering.

References:
 - [UNESCO on AI ethics and governance](https://www.unesco.org/ethics-ai/en)

#### #SECPROGRAM 
> Category: governance control  
> Permalink: https://owaspai.org/goto/secprogram/

Security program: Make sure the organization has a security program (also referred to as _information security management system_) and that it includes the whole AI lifecycle and AI specific aspects.

Purpose: ensures adequate mitigation of AI security risks through information security management, as the security program takes responsibility for the AI-specific threats and corresponding. For more details on using this document in risk analysis, see the [risk analysis section](/goto/riskanalysis/).

Make sure to include AI-specific assets and the threats to them. The threats are covered in this resource and the assets are:
- training data
- test data
- the model - often reffered to as _model parameters_ (values that change when a model is trained)
- documentation of models and the process of their development including experiments
- model input
- model output, which needs to be regarded as untrusted if the training data or model is untrusted
- sufficiently correct model behaviour
- data to train and test obtained from external sources
- models to train and use from external sources

By incorporating these assets and the threats to them, the security program takes care of mitigating these risks. For example: by informing engineers in awareness training that they should not leave their documentation laying around. Or: by installing malware detection on engineer machines because of the high sensitivity of the training data that they work with. 

Every AI initiative, new and existing, should perform a privacy and security risk analysis. AI programs have additional concerns around privacy and security that need to be considered. While each system implementation will be different based on its contextual purpose, the same process can be applied. These analyses can be performed before the development process and will guide security and privacy controls for the system. These controls are based on security protection goals such as Confidentiality, Integrity and Availability, and privacy goals such as Unlinkability, Transparency and Intervenability. ISO/IEC TR 27562:2023 provides a detailed list of points of attention for these goals and coverage.

The general process for performing an AI Use Case Privacy and Security Analysis is:
 - Describe the Ecosystem
 - Provide an assessment of the system of interest
 - Identify the security and privacy concerns
 - Identify the security and privacy risks
 - Identify the security and privacy controls
 - Identify the security and privacy assurance concerns

Because AI has specific assets (e.g. training data), **AI-specific honeypots** are a particularly interesting control. These are fake parts of the data/model/data science infrastructure that are exposed on purpose, in order to detect or capture attackers, before they succeed to access the real assets. Examples:

- Hardened data services, but with an unpatched vulnerability (e.g. Elasticsearch)
- Exposed data lakes, not revealing details of the actual assets
- Data access APIs vulnerable to brute-force attacks
- "Mirror" data servers that resemble development facilities, but are exposed in production with SSH access and labeled with names like "lab"
- Documentation 'accidentally' exposed, directing to a honeypot
- Data science Python library exposed on the server
- External access granted to a specific library
- Models imported as-is from GitHub

Monitoring and incident response are standard elements of security programs and AI can be included in it by understanding the relevant AI security assets, threats, and controls The discussion of threats include detection mechanisms that become part of monitoring.

**Useful standards include:**

  - The entire ISO 27000-27005 range is applicable to AI systems in the general sense as they are IT systems. Gap: covers this control fully regarding the processes, with the high-level particularity that there are three AI-specific attack surfaces that need to be taken into account in information security management: 1)AI development-time attacks, 2)attacks through model use and 3)AI Application security attacks. See the controls under the corresponding sections to see more particularities.
    These standards cover:

    - ISO/IEC 27000 – Information security management systems – Overview and vocabulary
    - ISO/IEC 27001 – Information security management systems – Requirements
    - ISO/IEC 27002 – Code of practice for information security management (See below)
    - ISO/IEC 27003 – Information security management systems: Implementation Guidelines)
    - ISO/IEC 27004 – Information security management measurements)
    - ISO/IEC 27005 – Information security risk management

  - The '27002 controls' mentioned throughout this document are listed in the Annex of ISO 27001, and further detailed with practices in ISO 27002. At the high abstraction level, the most relevant ISO 27002 controls are:
    - ISO 27002 control 5.1 Policies for information security
    - ISO 27002 control 5.10 Acceptable use of information and other associated assets
    - ISO 27002 control 5.8 Information security in project management
  - [OpenCRE on security program management](https://www.opencre.org/cre/261-010)
  - Risk analysis standards:
    - This document contains AI security threats and controls to facilitate risk analysis
    - See also [MITRE ATLAS framework for AI threats](https://atlas.mitre.org/)
    - ISO/IEC 27005 - as mentioned above. Gap: covers this control fully, with said particularity (as ISO 27005 doesn't mention AI-specific threats)
    - ISO/IEC 27563:2023 (AI use cases security & privacy) Discusses the impact of security and privacy in AI use cases and may serve as useful input to AI security risk analysis. The work bases its list of AI use cases on the 132 use cases belonging to 22 application domains in ISO/IEC TR 24030:2021, identifies 11 use cases with a maximum concern rating for security and 49 use cases with a maximum concern rating for privacy.
    - ISO/IEC 23894 (AI Risk management). Gap: covers this control fully - It refers to ISO/IEC 24028 (AI trustworthiness) for AI security threats. However,  ISO/IEC 24028 is not as comprehensive as AI Exchange (this document) or MITRE ATLAS as it is focused on risk management rather than threat enumeration. 
    - ISO/IEC 5338 (AI lifecycle) covers the AI risk management process. Gap: same as ISO 23894 above.
    - [ETSI Method and pro forma for Threat, Vulnerability, Risk Analysis](https://www.etsi.org/deliver/etsi_ts/102100_102199/10216501/05.02.03_60/ts_10216501v050203p.pdf)
    - [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
    - [OpenCRE on security risk analysis](https://www.opencre.org/cre/307-242)
    - [NIST SP 800-53 on general security/privacy controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
    - [NIST cyber security framework](https://www.nist.gov/cyberframework)
      

#### #SECDEVPROGRAM
> Category: governance control  
> Permalink: https://owaspai.org/goto/secdevprogram/

Secure development program:  Have processes concerning software development in place to make sure that security is built into your AI system.

Purpose: Reduces security risks by proper attention to mitigating those risks during software development.

The best way to do this is to build on your existing secure software development practices and include AI teams and AI particularities. This means that data science development activities should become part of your secure software development practices. Examples of these practices: secure development training, code review, security requirements, secure coding guidelines, threat modeling (including AI-specific threats), static analysis tooling, dynamic analysis tooling, and penetration testing. There is no need for an isolated secure development framework for AI.

Particularities for AI in secure software development:
- AI teams (e.g. data scientists) need to be taken into scope of your secure development activities, for them to address both conventional security threats and AI-specific threats, applying both conventional security controls and AI-specific ones. Typically, technical teams depend on the AI engineers when it comes to the AI-specific controls as they mostly require deep AI expertise. For example: if training data is confidential and collected in a distributed way, then a federated learning approach may be considered.
- AI security assets, threats and controls (as covered in this document) need to be considered, effecting requirements, policies, coding guidelines, training, tooling, testing practices and more. Ususally, this is done by adding these elements in the organizations Information Security Management System, as described in [SECPROGRAM](/goto/segprogram/), and align secure software development to that - just like it has been aligned on the conventional assets, threats and controls. 
- Apart from software components, the supply chain for AI can also include data and models which may have been poisoned, which is why data provenance and model management are central in [AI supply chain management](/goto/supplychainmanage/).
- In AI, software components can also run in the development environment instead of in production, for example to train models, which increases the attack surface e.g. malicious development components attacking training data.

AI-specific elements in the development environment (sometimes referred to as MLops):
- Supply chain management of data and models, including provenance of the internal processes (for data this effectively means data governance)
- In addition supply chain management: integrity checks on elements that can have been poisoned (data, models), using an internal or external signed registry for example
- Static code analysis
  - Running big data/AI technology-specific static analysis rules (e.g the typical mistake of creating a new dataframe in Python without assigning it to a new one)
  - Running maintainability analysis on code, as data and model engineering code is typically hindered by code quality issues
  - Evaluating code for the percentage of code for automated testing. Industry average is 43% (SIG benchmark report 2023). An often cited recommendation is 80%. Research shows that automated testing in AI engineering is often neglected (SIG benchmark report 2023), as the performance of the AI model is mistakenly regarded as the ground truth of correctness.
- Training (if required)
  - Automated training of the model when necessary
  - Automated detection of training set issues (standard data quality control plus checking for potential poisoning using pattern recognition or anomaly detection)
  - Any pre-training controls to mitigate poisoning risks, especially if the deployment process is segregated from the rest of the engineering environment in which poisoning an have taken place, e.g. fine pruning (reducing the size of the model and doing extra training with a ground truth training set)
  - Automated data collection and transformation to prepare the train set, when required
- Version management/traceability of the combination of code, configuration, training data and models, for troubleshooting and rollback
- Running AI-specific dynamic tests before deployment:
  - Automated validation of the model, including discrimination bias measurement
  - Security tests (e.g. data poisoning payloads, prompt injection payloads, adversarial robustness testing)
- Running AI-specific dynamic tests in production:
  - Continual automated validation of the model, including discrimination bias measurement and the detection of staleness: the input space changing over time, causing the training set to get out of date
- Potential protection measures in deployment of the model (e.g. obfuscation, encryption, or hashing)

Depending on risk analysis, certain threats may require specific practices in the development lifecycle. These threats and controls are covered elsewhere in this document. 

Related controls:
- [Development program](/goto/devprogram/) on including AI engineering in all software lifecycle processes (e.g. versioning, portfolio management, retirement)
- [Supply chain management](/goto/supplychainmanage/) which discusses AI-specific supply-chain risks
- [Development security](/goto/devsecurity/) on protecting the development environment

Useful standards include:
- ISO 27002 control 8.25 Secure development lifecycle. Gap: covers this control fully, with said particularity, but lack of detail - the 8.25 Control description in ISO 27002:2022 is one page, whereas secure software development is a large and complex topic - see below for further references
- ISO/IEC 27115 (Cybersecurity evaluation of complex systems)
- See [OpenCRE on secure software development processes](https://www.opencre.org/cre/616-305) with notable links to NIST SSDF and OWASP SAMM. Gap: covers this control fully, with said particularity

References: 
- [OWASP SAMM](https://owaspsamm.org)
- [NIST SSDF](https://csrc.nist.gov/projects/ssdf)
- [NIST SSDF AI practices](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218A.ipd.pdf)

#### #DEVPROGRAM 
> Category: governance control  
> Permalink: https://owaspai.org/goto/devprogram/

Development program: Having a development lifecycle program for AI. Apply general (not just security-oriented) software engineering best practices to AI development.

Data scientists are focused on creating working models, not on creating future-proof software per se. Often, organizations already have software practices and processes in place. It is important to extend these to AI development, instead of treating AI as something that requires a separate approach. Do not isolate AI engineering. This includes automated testing, code quality, documentation, and versioning. ISO/IEC 5338 explains how to make these practices work for AI.

Purpose: This way, AI systems will become easier to maintain, transferable, secure, more reliable, and future-proof.

A best practice is to mix data scientist profiles with software engineering profiles in teams, as software engineers typically need to learn more about data science, and data scientists generally need to learn more about creating future-proof, maintainable, and easily testable code.

Another best practice is to continuously measure quality aspects of data science code (maintainability, test code coverage), and provide coaching to data scientists in how to manage those quality levels.

Apart from conventional software best practices, there are important AI-specific engineering practices, including for example data provenance & lineage, model traceability and AI-specific testing such as continuous validation, testing for model staleness and concept drift. ISO/IEC 5338 discusses these AI engineering practices.

Related controls that are key parts of the development lifecycle:
- [Secure development program](/goto/secdevprogram/)
- [Supply chain management](/goto/supplychainmanage/)
- [Continuous validation](/goto/continuousvalidation/)
- [Unwanted bias testing](/goto/unwantedbiastesting)

The below interpretation diagram of ISO/IEC 5338 provides a good overview to get an idea of the topics involved.
![5338](/images/5338.png)

Useful standards include:

  - [ISO/IEC 5338 - AI lifecycle](https://www.iso.org/standard/81118.html) Gap: covers this control fully - ISO 5338 covers the complete software development lifecycle for AI, by extending the existing ISO 12207 standard on software lifecycle: defining several new processes and discussing AI-specific particularities for existing processes. See also [this blog](https://www.softwareimprovementgroup.com/iso-5338-get-to-know-the-global-standard-on-ai-systems/).
  - [ISO/IEC 27002](https://www.iso.org/standard/75652.html) control 5.37 Documented operating procedures. Gap: covers this control minimally - this covers only a very small part of the control
  - [OpenCRE on documentation of function](https://www.opencre.org/cre/162-655) Gap: covers this control minimally

  References:

  - [Research on code quality gaps in AI systems](https://www.softwareimprovementgroup.com/averting-a-major-ai-crisis-we-need-to-fix-the-big-quality-gap-in-ai-systems/)

#### #CHECKCOMPLIANCE 
> Category: governance control  
> Permalink: https://owaspai.org/goto/checkcompliance/

Check compliance: Make sure that AI-relevant laws and regulations are taken into account in compliance management (including security aspects). If personal data is involved and/or AI is applied to make decisions about individuals, then privacy laws and regulations are also in scope. See the [OWASP AI Guide](https://owasp.org/www-project-ai-security-and-privacy-guide/) for privacy aspects of AI.  
Compliance as a goal can be a powerful driver for organizations to grow their readiness for AI. While doing this it is important to keep in mind that legislation has a scope that does not necessarily include all the relevant risks for the organization. Many rules are aboutthe potential harm to individuals and society, and don’t cover the impact on business processes per se. For example: the European AI act does not include risks for protecting company secrets. In other words: be mindful of blind spots when using laws and regulations as your guide.


Global Jurisdictional considerations (as of end of 2023):
- Canada: Artificial Intelligence & Data Act
- USA: (i) Federal AI Disclosure Act, (ii) Federal Algorithmic Accountability Act
- Brazil: AI Regulatory Framework
- India: Digital India Act
- Europe: (i) AI Act, (ii) AI Liability Directive, (iii) Product Liability Directive
- China: (i) Regulations on the Administration of Deep Synthesis of Internet Information Services, (ii) Shanghai Municipal Regulations on Promoting Development of AI Industry, (iii) Shenzhen Special Economic Zone AI Industry Promotion Regulations, (iv) Provisional Administrative Measures for Generative AI Services

General Legal Considerations on AI/Security:
- Privacy Laws: AI must comply with all local/global privacy laws at all times, such as GDPR, CCPA, HIPAA. See [Privacy](/goto/privacy/)
- Data Governance: any AI components/functions provided by a 3rd party for integration must have data governance frameworks, including those for the protection of personal data and structure/definitions on how its collected, processed, stored
- Data Breaches: any 3rd party supplier must answer as to how they store their data and security frameworks around it, which may include personal data or IP of end-users

Non-Security Compliance Considerations: 
- Ethics: Deep fake weaponization and how system addresses and deals with it, protects against it and mitigates it
- Human Control: any and all AI systems should be deployed with appropriate level of human control and oversight, based on ascertained risks to individuals. AI systems should be designed and utilized with the concept that the use of AI respects dignity and rights of individuals; “Keep the human in the loop” concept. See [Oversight](/goto/oversight/).
- Discrimination: a process must be included to review datasets to avoid and prevent any bias. See [Unwanted bias testing](/goto/unwantedbiastesting/).
- Transparency: ensure transparency in the AI system deployment, usage and proactive compliance with regulatory requirements; “Trust by Design”
- Accountability: AI systems should be accountable for actions and outputs and usage of data sets. See [AI Program](/goto/aiprogram/)

References
  - [Vischer on legal aspects of AI](https://www.vischer.com/en/artificial-intelligence/)

Useful standards include:

  - [OpenCRE on Compliance](https://www.opencre.org/cre/510-324)
  - ISO 27002 Control 5.36 Compliance with policies, rules and standards. Gap: covers this control fully, with the particularity that AI regulation needs to be taken into account.

#### #SECEDUCATE
> Category: governance control  
> Permalink: https://owaspai.org/goto/seceducate/

Security education for data scientists and development teams on AI threat awareness, including attacks on models. It is essential for all engineers, including data scientists, to attain a security mindset.

Useful standards include:

  - ISO 27002 Control 6.3 Awareness training. Gap: covers this control fully, but lacks detail and needs to take into account the particularity: training material needs to cover AI security threats and controls

---

## 1.2 General controls for sensitive data limitation
> Category: group of controls  
> Permalink: https://owaspai.org/goto/datalimit/

The impact of security threats on confidentiality and integrity can be reduced by limiting the data attack surface, meaning that the amount and the variety of data is reduced as much as possible, as well as the duration in which it is kept. This section describes several controls to apply this limitation.

#### #DATAMINIMIZE
> Category: development-time and runtime control  
> Permalink: https://owaspai.org/goto/dataminimize/

Data minimize: remove data fields or records (e.g. from a training set) that are unnecessary for the application, in order to prevent potential data leaks or manipulation. 

Purpose: minimize the impact of data leakage or manipulation

A typical opportunity to remove unnecessary data in machine learning is to clean up data that has just been for experimental use.

A method to determine which fields or records can be removed is to statistically analyze which data elements do not play a role in model performance. 

  Useful standards include:

  - Not covered yet in ISO/IEC standards.

#### #ALLOWEDDATA 
> Category: development-time and runtime control    
> Permalink: https://owaspai.org/goto/alloweddata/

Ensure allowed data, meaning: removing data (e.g. from a training set) that is prohibited for the intended purpose. This is particularly important if consent was not given and the data contains personal information collected for a different purpose. 

Purpose: Apart from compliance, the purpose is to minimize the impact of data leakage or manipulation

Useful standards include:

  - ISO/IEC 23894 (AI risk management) covers this in A.8 Privacy. Gap: covers this control fully, with a brief section on the idea

#### #SHORTRETAIN
> Category: development-time and runtime control    
> Permalink: https://owaspai.org/goto/shortretain/

Short retain: Remove or anonymize data once it is no longer needed, or when legally required (e.g., due to privacy laws).

Purpose: minimize the impact of data leakage or manipulation

Limiting the retention period of data can be seen as a special form of data minimization. Privacy regulations typically require personal data to be removed when it is no longer needed for the purpose for which it was collected. Sometimes exceptions need to be made because of other rules (e.g. to keep a record of proof). Apart from these regulations, it is a general best practice to remove any sensitive data when it is no longer of use, to reduce the impact of a data leak.
  
Useful standards include:

  - Not covered yet in ISO/IEC standards.

#### #OBFUSCATETRAININGDATA
> Category: development-time data science control    
> Permalink: https://owaspai.org/goto/obfuscatetrainingdata/

Obfuscate training data: attain a degree of obfuscation of sensitive data where possible

Purpose: minimize the impact of data leakage or manipulation

**Anonymization**  
Obfuscation for data on individuals has the goal to anonymize, meaning to prevent re-identification: deducing or inducing someone's identity.   
Be very careful with anonymization: removing or obfuscating PII / personal data is often not sufficient, as someone's identity may be induced from the other data that you keep of the person (locations, times, visited websites, activities together with data and time, etc).  
The risk of re-identification can be assessed by experts using statistical properties such as K-anonymity, L-diversity, and T-closeness.  
Anonymity is not an absolute concept, but a statistical one. Even if someone's identity can be guessed from data with some certainty, it can be harmful. The concept of _differential privacy_ helps to analyse the level of anonymity. It is a framework for formalizing privacy in statistical and data analysis, ensuring that the privacy of individual data entries in a database is protected. The key idea is to make it possible to learn about the population as a whole while providing strong guarantees that the presence or absence of any single individual in the dataset does not significantly affect the outcome of any analysis. This is often achieved by adding a controlled amount of random noise to the results of queries on the database. This noise is carefully calibrated to mask the contribution of individual data points, which means that the output of a data analysis (or query) should be essentially the same, whether any individual's data is included in the dataset or not. In other words by observing the output, one should not be able to infer whether any specific individual's data was used in the computation.

Distorting training data can make it effectively uncrecognizable, which of course needs to be weighed against the inaccuracy that this typically creates. See also [TRAINDATADISTORTION](/goto/traindatadistortion/) which is about distortion against data poisoning and [EVASIONROBUSTMODEL](/goto/evasionrobustmodel/) for distortion against evasion attacks. Together with this control OBFUSCATETRAININGDATA, these are all approaches that distort training data, but for different purposes.

**Examples of approaches are:**

- Private Aggregation of Teacher Ensembles (PATE)
    
  Private Aggregation of Teacher Ensembles (PATE) is a privacy-preserving machine learning technique. This method tackles the challenge of training models on sensitive data while maintaining privacy. It achieves this by employing an ensemble of "teacher" models along with a "student" model. Each teacher model is independently trained on distinct subsets of sensitive data, ensuring that there is no overlap in the training data between any pair of teachers. Since no single model sees the entire dataset, it reduces the risk of exposing sensitive information. Once the teacher models are trained, they are used to make predictions. When a new (unseen) data point is presented, each teacher model gives its prediction. These predictions are then aggregated to reach a consensus. This consensus is considered more reliable and less prone to individual biases or overfitting to their respective training subsets. To further enhance privacy, noise is added to the aggregated predictions. By adding noise, the method ensures that the final output doesn't reveal specifics about the training data of any individual teacher model. The student model is trained not on the original sensitive data, but on the aggregated and noised predictions of the teacher models. Essentially, the student learns from the collective wisdom and privacy-preserving outputs of the teachers. This way, the student model can make accurate predictions without ever directly accessing the sensitive data. However, there are challenges in balancing the amount of noise (for privacy) and the accuracy of the student model. Too much noise can degrade the performance of the student model, while too little might compromise privacy.

  References:

  - [SF-PATE: Scalable, Fair, and Private Aggregation of Teacher Ensembles](https://arxiv.org/abs/2204.05157)
   
- Objective function perturbation
    
  Objective function perturbation is a differential privacy technique used to train machine learning models while maintaining data privacy. It involves the intentional introduction of a controlled amount of noise into the learning algorithm’s objective function, which is a measure of the discrepancy between a model’s predictions and the actual results. The perturbation, or slight modification, involves adding noise to the objective function, resulting in a final model that doesn’t exactly fit the original data, thereby preserving privacy. The added noise is typically calibrated to the objective function’s sensitivity to individual data points and the desired privacy level, as quantified by parameters like epsilon in differential privacy. This ensures that the trained model doesn’t reveal sensitive information about any individual data point in the training dataset. The main challenge in objective function perturbation is balancing data privacy with the accuracy of the resulting model. Increasing the noise enhances privacy but can degrade the model’s accuracy. The goal is to strike an optimal balance where the model remains useful while individual data points stay private.

  References:

  - [Differentially Private Objective Perturbation: Beyond Smoothness and Convexity](https://arxiv.org/abs/1909.01783v1)

- Masking

  Masking involves the alteration or replacement of sensitive features within datasets with alternative representations that retain the essential information required for training while obscuring sensitive details. Various methods can be employed for masking, including tokenization, perturbation, generalization, and feature engineering. Tokenization replaces sensitive text data with unique identifiers, while perturbation adds random noise to numerical data to obscure individual values. Generalization involves grouping individuals into broader categories, and feature engineering creates derived features that convey relevant information without revealing sensitive details. Once the sensitive features are masked or transformed, machine learning models can be trained on the modified dataset, ensuring that they learn useful patterns without exposing sensitive information about individuals. However, achieving a balance between preserving privacy and maintaining model utility is crucial, as more aggressive masking techniques may lead to reduced model performance.

  References:

  - [Data Masking with Privacy Guarantees]([https://arxiv.org/abs/1909.01783v1](https://arxiv.org/abs/1901.02185))

- Encryption

  Encryption is a fundamental technique for pseudonymization and data protection. It underscores the need for careful implementation of encryption techniques, particularly asymmetric encryption, to achieve robust pseudonymization. Emphasis is placed on the importance of employing randomized encryption schemes, such as Paillier and Elgamal, to ensure unpredictable pseudonyms. Furthermore, homomorphic encryption, which allows computations on ciphertexts without the decryption key, presents potential advantages for cryptographic operations but poses challenges in pseudonymization. The use of asymmetric encryption for outsourcing pseudonymization and the introduction of cryptographic primitives like ring signatures and group pseudonyms in advanced pseudonymization schemes are important.

  There are two models of encryption in machine learning:

  1. (part of) the data remains in encrypted form for the data scientists all the time, and is only in its original form for a separate group of data engineers, that prepare and then encrypt the data for the data scientists.
  2. the data is stored and communicated in encrypted form to protect against access from users outside the data scientists, but is used in its original form when analysed, and transformed by the data scientists and the model. In the second model it is important to combine the encryption with proper access control, because it hardly offers protection to encrypt data in a database and then allow any user access to that data through the database application.

- Tokenization

  Tokenization is a technique for obfuscating data with the aim of enhancing privacy and security in the training of machine learning models. The objective is to introduce a level of obfuscation to sensitive data, thereby reducing the risk of exposing individual details while maintaining the data's utility for model training. In the process of tokenization, sensitive information, such as words or numerical values, is replaced with unique tokens or identifiers. This substitution makes it difficult for unauthorized users to derive meaningful information from the tokenized data.
    
  Within the realm of personal data protection, tokenization aligns with the principles of differential privacy. When applied to personal information, this technique ensures that individual records remain indiscernible within the training data, thus safeguarding privacy. Differential privacy involves introducing controlled noise or perturbations to the data to prevent the extraction of specific details about any individual.
    
  Tokenization aligns with this concept by replacing personal details with tokens, increasing the difficulty of linking specific records back to individuals.
Tokenization proves particularly advantageous in development-time data science when handling sensitive datasets. It enhances security by enabling data scientists to work with valuable information without compromising individual privacy. The implementation of tokenization techniques supports the broader objective of obfuscating training data, striking a balance between leveraging valuable data insights and safeguarding the privacy of individuals.

- Anonymization
    
  Anonymization is the process of concealing or transforming sensitive information in a dataset to protect individuals' privacy and identity. This involves replacing or modifying identifiable elements with generic labels or pseudonyms, aiming to obfuscate data and prevent specific individual identification while maintaining data utility for effective model training. In the broader context of advanced pseudonymization methods, anonymization is crucial for preserving privacy and confidentiality in data analysis and processing.

  Challenges in anonymization include the need for robust techniques to prevent re-identification, limitations of traditional methods, and potential vulnerabilities in achieving true anonymization. There is an intersection with advanced techniques such as encryption, secure multiparty computation, and pseudonyms with proof of ownership.

  In the healthcare sector with personally identifiable information (PII), there are potential pseudonymization options, emphasizing advanced techniques like asymmetric encryption, ring signatures, group pseudonyms and pseudonyms based on multiple identifiers. In the cybersecurity sector, pseudonymization is applied in common use cases, such as telemetry and reputation systems.
    
  These use cases demonstrate the practical relevance and applicability of pseudonymization techniques in real-world scenarios, offering valuable insights for stakeholders involved in data pseudonymization and data protection.

  
**Further references:**
- Abadi, M., Chu, A., Goodfellow, I., McMahan, H. B., Mironov, I., Talwar, K., & Zhang, L. (2016). Deep learning with differential privacy. Proceedings of the 2016 ACM SIGSAC Conference on Computer and Communications Security, 308-318. [Link](https://doi.org/10.1145/2976749.2978318)
  - Dwork, C., & Roth, A. (2014). The Algorithmic Foundations of Differential Privacy. Foundations and Trends in Theoretical Computer Science. [Link](https://doi.org/10.1561/0400000042)

**Useful standards include:**

- Not covered yet in ISO/IEC standards.

#### #DISCRETE
> Category: development-time and runtime control    
> Permalink: https://owaspai.org/goto/discrete/

Minimize access to technical details that could help attackers.

Purpose: reduce the information available to attackers, which can assist them in selecting and tailoring their attacks, thereby lowering the probability of a successful attack.

Miminizing and protecting technical details can be achieved by incorporating such details as an asset into information security management. This will ensure proper asset management, data classification, awareness education, policy, and inclusion in risk analysis.

Note: this control needs to be weighed against the [AITRANSPARENCY](#aitransparency) control that requires to be more open about technical aspects of the model. The key is to minimize information that can help attackers while being transparent.

For example:

  - Consider this risk when publishing technical articles on the AI system
  - When choosing a model type or model implementation, take into account that there is an advantage of having technology with which attackers are less familiar
  - Minimize model output regarding technical details


Useful standards include:

  - ISO 27002 Control 5.9: Inventory of information and other associated assets. Gap: covers this control fully, with the particularity that technical data science details can be sensitive. .
  - See [OpenCRE on data classification and handling](https://www.opencre.org/cre/074-873). Gap: idem
  - [MITRE ATlAS Acquire Public ML Artifacts](https://atlas.mitre.org/techniques/AML.T0002)

---

## 1.3. Controls to limit the effects of unwanted behaviour
> Category: group of controls  
> Permalink: https://owaspai.org/goto/limitunwanted/

Unwanted model behaviour is the intended result of many AI security attacks. There are many ways to prevent and to detect these attacks. This section is about how the effects of unwanted model behaviour can be controlled, in order to reduce the impact of an attack.

Besides attacks, AI systems can display unwanted behaviour for other reasons, making the control of this behaviour a shared responsibility. Main potential causes of unwanted model behaviour:

- Insufficient or incorrect training data
- Model staleness/ Model drift (i.e. the model becoming outdated)
- Mistakes during model and data engineering
- Security threats: attacks as laid out in this document, e.g. model poisoning, evasion attacks

Successfully mitigating unwanted model behaviour has its own threats:

- Overreliance: the model is being trusted too much by users
- Excessive agency: the model is being trusted too much by engineers and gets excessive functionality, permissions, or autonomy

Example: The typical use of plug-ins in Large Language Models (GenAI) presents specific risks concerning the protection and privileges of these plug-ins. This is because they enable Large Language Models (LLMs, a GenAI) to perform actions beyond their normal interactions with users. ([OWASP for LLM 07](https://llmtop10.com/llm07/))

Example: LLMs (GenAI), just like most AI models, induce their results based on training data, meaning that they can make up things that are false. In addition, the training data can contain false or outdated information. At the same time, LLMs (GenAI) can come across very confident about their output. These aspects make overreliance of LLM (GenAI) ([OWASP for LLM 09](https://llmtop10.com/llm09/)) a real risk, plus excessive agency as a result of that ([OWASP for LLM 08](https://llmtop10.com/llm08/)). Note that all AI models in principle can suffer from overreliance - not just Large Language Models.

**Controls to limit the effects of unwanted model behaviour:**

#### #OVERSIGHT
> Category: runtime control    
> Permalink: https://owaspai.org/goto/oversight/

Oversight of model behaviour by humans or business logic in the form of rules (guardrails).
  
Purpose: Detect unwanted model behavior and correct or halt the execution of a model's decision.

**Limitations of guardrails:**
The properties of wanted or unwanted model behavior often cannot be entirely specified, limiting the effectiveness of guardrails.

**Limitations of human oversight:**
The alternative to guardrails is to apply human oversight. This is of course more costly and slower, but allows for more intelligent validation given the involved common sense and human domain knowledge - provided that the person performing the oversight actually has the required knowledge.
For human operators or drivers of automated systems like self-driving cars, staying actively involved or having a role in the control loop helps maintain situational awareness. This involvement can prevent complacency and ensures that the human operator is ready to take over control if the automated system fails or encounters a scenario it cannot handle. However, maintaining situational awareness can be challenging with high levels of automation due to the "out-of-the-loop" phenomenon, where the human operator may become disengaged from the task at hand, leading to slower response times or decreased effectiveness in managing unexpected situations.
In other words: If you as a user are not involved actively in performing a task, then you lose understanding of whether it is correct or what the impact can be. If you then only need to confirm something by saying 'go ahead' or 'cancel', a badly informed 'go ahead' is easy to pick.

Designing automated systems that require some level of human engagement or regularly update the human operator on the system's status can help maintain situational awareness and ensure safer operations.
  
Examples:

  - Logic preventing the trunk of a car from opening while the car is moving, even if the driver seems to request it
  - Requesting user confirmation before sending a large number of emails as instructed by a model
  - A special form of guardrails is censoring unwanted output of GenAI models (e.g. violent, unethical)
  - 
Useful standards include:

  - ISO/IEC 42001 B.9.3 defines controls for human oversight and decisions regarding autonomy. Gap: covers this control partly (human oversight only, not business logic)
  - Not covered further in ISO/IEC standards.

#### #LEASTMODELPRIVILEGE
> Category: runtime information security control    
> Permalink: https://owaspai.org/goto/leastmodelprivilege/

Least model privilege: Minimize privileges of a model to autonomously take actions.

For example: avoid connecting a model to an email facility to prevent it from sending incorrect or sensitive information to others.

Useful standards include:

  - ISO 27002 control 8.2 Privileged access rights. Gap: covers this control fully, with the particularity that privileges assigned to autonomous model decisions need to be assigned with the risk of unwanted model behaviour in mind.
  - [OpenCRE on least privilege](https://www.opencre.org/cre/368-633) Gap: idem

#### #AITRANSPARENCY
> Category: runtime control    
> Permalink: https://owaspai.org/goto/aitransparency/

AI transparency: By being transparent with users about the rough workings of the model, its training process, and the general expected accuracy and reliability of the AI system's output, people can adjust their reliance ([OWASP for LLM 09](https://llmtop10.com/llm09/)) on it accordingly. The simplest form of this is to inform users that an AI model is being involved. Transparency here is about providing abstract information regarding the model and is therefore something else than _explainability_.

See the [DISCRETE](#discrete) control for the balance between being transparent and being discrete about the model. 

Useful standards include:

  - ISO/IEC 42001 B.7.2 describes data management to support transparency. Gap: covers this control minimally, as it only covers the data mnanagement part.
  - Not covered further in ISO/IEC standards.

#### #CONTINUOUSVALIDATION
> Category: runtime data science control  
> Permalink: https://owaspai.org/goto/continuousvalidation/

Continuous validation: by frequently testing the behaviour of the model against an appropriate test set, it is possible to detect sudden changes caused by a permanent attack (e.g. data poisoning, model poisoning), and also some robustness issues agains for example evasion attacks.

Continuous validation is a process that is often in place to detect other issues than attacks: system failures, or the model performance going down because of changes in the real world since it was trained.

Note that continuous validation is typically not suitable for detecting backdoor poisoning attacks, as these are designed to trigger with very specific input that would normally not be present in test sets. In fact. Such attacks are often designed to pass validation tests.

Useful standards include:

- ISO 5338 (AI lifecycle) Continuous validation. Gap: covers this control fully

#### #EXPLAINABILITY 
> Category: runtime data science control  
> Permalink: https://owaspai.org/goto/explainability/

Explainability: Explaining how individual model decisions are made, a field referred to as Explainable AI (XAI), can aid in gaining user trust in the model. In some cases, this can also prevent overreliance, for example, when the user observes the simplicity of the 'reasoning' or even errors in that process. See [this Stanford article on explainability and overreliance](https://hai.stanford.edu/news/ai-overreliance-problem-are-explanations-solution). Explanations of how a model works can also aid security assessors to evaluate AI security risks of a model.

#### #UNWANTEDBIASTESTING 
> Category: runtime data science control  
> Permalink: https://owaspai.org/goto/unwantedbiastesting/

Unwanted bias testing: by doing test runs of the model to measure unwanted bias, unwanted behaviour caused by an attack can be detected. The details of bias detection fall outside the scope of this document as it is not a security concern - other than that an attack on model behaviour can cause bias.
