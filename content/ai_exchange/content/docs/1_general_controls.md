---
title: 1. General controls
weight: 2
---
## 1.1 General governance controls

#### #AIPROGRAM

(management). Having an AI program. Take responsibility for AI as an organization, by keeping an inventory of AI initiatives, perform risk analysis on them, and manage those risks.

This includes assigning responsibilities, e.g. model accountability, data accountability, and risk governance. For the high risk systems: attain responsible AI and transparency in the form of communication and documentation, auditability, bias countermeasures, oversight and cyber security.

Technically one could argue that this control is out of scope for cyber security, but it initiates action to get in control of AI security.

Purpose: 1) reduces probability of AI initiatives being overlooked for proper governance (including security) - as covered by controls in this document, and 2) increases incentive for proper governance as the AI program takes responsibility for it. Without proper governance, the controls in this document can only happen by accident.

See Risk management under SECPROGRAM for security-specific risk analysis.

Note that an AI program is not just about risk TO AI, such as security risks - it is also about risks BY AI, such as threats to fairness, safety, etc.

Links to standards:
 - ISO/IEC 42001 AI management system (under development). Gap: covers this control fully.
 
42001 is about extending your risk management system - it focuses on governance. 5338 is about extending your software lifecycle practices - it focuses on engineering and everything around it. The 42001 can be seen as a management system for the governance of responsible AI in an organization, similar to how 27001 is a management system for information security. The 42001 doesn’t go deep into the lifecycle processes. It for example does not discuss versioning of AI models, project planning issues, and how and when exactly sensitive data is used.


#### #SECPROGRAM 
(management). Having a security program. Include the whole AI lifecycle and AI particularities in the organization's security program (also referred to as _information security management system_).

Make sure to include AI-specific threats and assets (e.g. assets the development environment includign AI Ops / ML Ops).

Purpose: reduces probability of AI initiatives being overlooked for information security management, vastly decreasing security risk as the security program takes responsibility for the AI-specific threats and corresponding controls in this document. For more details on using this document in risk analysis, see the Introduction section.

Particularity: the AI lifecycle and its specific assets and security threats need to be part of the organization's information security governance.

Because AI has specific assets (e.g. training data), **AI-speific honeypots** are a partiularly interesting control. These are fake parts of the data/model/datascience infrastucture that are exposed on purpose, in order to detect or capture attackers, before they succeed to access the real assets. Examples:

- Hardened data services, but with an unpatched vulnerability (e.g. Elasticsearch)
- Exposed data lakes, not revealing details of the actual assets
- Data access APIs vulnerable to brute-force attacks
- "Mirror" data servers that resemble development facilities, but are exposed in production with SSH access and labeled with names like "lab"
- Documentation 'accidentally' exposed, directing to a honeypot
- Data science Python library exposed on the server
- External access granted to a specific library
- Models imported as-is from GitHub

Links to standards:

  - The entire 27000-27005 range is applicable to AI systems in the general sense as they are IT systems. Gap: covers this control fully, with the high-level particularity that there are three AI-specific attack surfaces that need to be taken into account in information security management: 1)AI development-time attacks, 2)attacks through model use and 3)AI Application security attacks. See the controls under the corresponding sections to see more particularities.
    These standards cover:

    - ISO/IEC 27000 – Information security management systems – Overview and vocabulary
    - ISO/IEC 27001 – Information security management systems – Requirements
    - ISO/IEC 27002 – Code of practice for information security management (See below)
    - ISO/IEC 27003 – Information security management systems: Implementation Guidelines)
    - ISO/IEC 27004 – Information security management measurements)
    - ISO/IEC 27005 – Information security risk management

  - The '27002 controls' mentioned throughout this document are listed in the Annex of 27001, and further detailed with practices in 27002. At the high abstraction level, the most relevant 27002 controls are:
    - 27002 control 5.1 Policies for information security
    - 27002 control 5.10 Acceptable use of information and other associated assets
    - 27002 control 5.8 Information security in project management
  - [OpenCRE on security program management](https://www.opencre.org/cre/261-010)
  - Risk analysis standards:
    - This document contains AI security threats and controls to facilitate risk analysis
    - See also [MITRE ATLAS framework for AI threats](https://atlas.mitre.org/)
    - ISO/IEC 27005 - as mentioned above. Gap: covers this control fully, with said particularity (as 27005 doesn't mention AI-specific threats)
    - ISO/IEC 27563 (AI use cases security & privacy) Discusses the impact of security and privacy in AI use cases and may serve as useful input to AI security risk analysis. 
    - ISO/IEC 23894 (AI Risk management). Gap: covers this control fully - yet it refers to ISO/IEC 24028 (AI trustworthiness) for AI security threats, which is incomplete compared to for example the AI exchange (this document). The scope is broader than security which is not an issue. 
    - ISO/IEC 5338 (AI lifecycle) covers the AI risk management process. Gap: same as 23894 above.
    - [ETSI Method and pro forma for Threat, Vulnerability, Risk Analysis](https://www.etsi.org/deliver/etsi_ts/102100_102199/10216501/05.02.03_60/ts_10216501v050203p.pdf)
    - [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
    - [OpenCRE on security risk analysis](https://www.opencre.org/cre/307-242)
    - [NIST SP 800-53 on general security/privacy controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
    - [NIST cyber security framework](https://www.nist.gov/cyberframework)

#### #SECDEVPROGRAM
(management). Make data science development activities part of the secure software development program.

See elsewhere in this document for SUPPLYCHAINMANAGE which discusses AI-specific supply-chain risks.

Purpose: Reduces security risks by proper attention to mitigating those risks during software development.

Particularity: Data science development activities need to be taken into scope of secure development lifecycle.

An important practice in secure software development is Threat modeling, which in the case of AI needs to take the threats in this document into account.

Links to standards:

  - 27002 control 8.25 Secure development lifecycle. Gap: covers this control fully, with said particularity, but lack of detail - the 8.25 Control description in 27002(2022) is one page, whereas secure software development is a large and complex topic - see below for further references
  - ISO/IEC 27115 (Cybersecurity evaluation of complex systems) 
  - See [OpenCRE on secure software development processes](https://www.opencre.org/cre/616-305) with notable links to NIST SSDF and OWASP SAMM. Gap: covers this control fully, with said particularity

#### #DEVPROGRAM 
(management). Having a development program for AI. Apply general (not just security-oriented) software engineering best practices to AI development.

Data scientists are focused on creating working models, not on creating future-proof software per se. Often, organizations already have software practices and processes in place. It is important to extend these to AI development, instead of treating AI as something that requires a separate approach. Do not isolate AI engineering. This includes automated testing, code quality, documentation, and versioning. ISO/IEC 5338 explains how to make these practices work for AI.

Purpose: This way, AI systems will become easier to maintain, transferable, secure, more reliable, and future-proof.

A best practice is to mix data scientist profiles with software engineering profiles in teams, as software engineers typically need to learn more about data science, and data scientists generally need to learn more about creating future-proof, maintainable, and easily testable code.

Another best practice is to continuously measure quality aspects of data science code (maintainability, test code coverage), and provide coaching to data scientists in how to manage those quality levels.

Apart from conventional software best practices, there are important AI-specific engineering practices, including for example data provenance & lineage, model traceability and AI-specific testing such as continuous validation, testing for model staleness and concept drift. ISO/IEC 5338 discussess these AI engineering practices.

Links to standards:

  - [ISO/IEC 5338 - AI lifecycle](https://www.iso.org/standard/81118.html) Gap: covers this control fully - the 5338 covers the complete software development lifecycle for AI, by extending the existing 12207 standard on software lifecycle: defining several new processes and discussing AI-specific particularities for existing processes.
  - 27002 control 5.37 Documented operating procedures. Gap: covers this control minimally - this covers only a very small part of the control
  - [OpenCRE on documentation of function](https://www.opencre.org/cre/162-655) Gap: covers this control minimally
 
  References:

  - [Research on code quality gaps in AI systems](https://www.softwareimprovementgroup.com/averting-a-major-ai-crisis-we-need-to-fix-the-big-quality-gap-in-ai-systems/)

#### #CHECKCOMPLIANCE 
(management). Check compliance with laws and regulations, to validate compliance which may include security aspects. See the [OWASP AI Guide](https://owasp.org/www-project-ai-security-and-privacy-guide/) for privacy aspects of AI.  
Links to standards:

  - [OpenCRE on Compliance](https://www.opencre.org/cre/510-324)
  - 27002 Control 5.36 Compliance with policies, rules and standards. Gap: covers this control fully, with the particularity that AI regulation needs to be taken into account.

#### #SECEDUCATE
(management). Security education for data scientists and development teams on AI threat awareness, including attacks on models. It is essential for all engineers, including data scientists, to attain a security mindset.

Links to standards:

  - 27002 Control 6.3 Awareness training. Gap: covers this control fully, but lacks detail and needs to take into account the particularity: training material needs to cover AI security threats and controls

---

## 1.2 General controls for sensitive data limitation

#### #DATAMINIMIZE
(development-time and runtime). Data minimize: remove or anonymize data fields or records that are unnecessary for the application to prevent potential leaks. Data minimization can also involve statistically analyzing a training dataset to identify and eliminate superfluous records or fields that are not essential for achieving sufficient performance (Data Science).

Purpose: reduce the impact in case of an attack by reducing the amount of data that can leak.

  Links to standards:

  - Not covered yet in ISO/IEC standards. 

#### #ALLOWEDDATA 
(development-time and runtime). Ensure allowed data, meaning the data used (e.g., training set) is permitted for the intended purpose. This is particularly important if consent was not given and the data contains personal information collected for a different purpose.
Links to standards:

  - ISO/IEC 23894 (AI risk management) covers this in A.8 Privacy. Gap: covers this control fully, with a brief section on the idea

#### #SHORTRETAIN
(development-time and runtime). Short retain: Remove or anonymize data once it is no longer needed, or when legally required (e.g., due to privacy laws), to minimize the risk of data leakage.

Limiting the retention period of data can be seen as a special form of data minimization. Privacy regulations typically require personal data to be removed when it is no longer needed for the purpose for which it was collected. Sometimes exceptions need to be made because of other rules (e.g. to keep a record of proof). Apart from these regulations, it is a general best practice to remove any sensitive data when it is no longer of use, to reduce the impact of a data leak.
  
Links to standards:

  - Not covered yet in ISO/IEC standards. 

#### #OBFUSCATETRAININGDATA
(development-time datascience). Obfuscate training data: attain a degree of obfuscation of sensitive data where possible. When this is done for personal data, it is referred to as _differential privacy_.

Examples of approaches are:

- Private Aggregation of Teacher Ensembles (PATE)
    
Private Aggregation of Teacher Ensembles (PATE) is a privacy-preserving machine learning technique. This method tackles the challenge of training models on sensitive data while maintaining privacy. It achieves this by employing an ensemble of "teacher" models along with a "student" model. Each teacher model is independently trained on distinct subsets of sensitive data, ensuring that there is no overlap in the training data between any pair of teachers. The collective consensus of predictions from the teacher models is then utilized to supervise the training of the student model. To enhance privacy assurances, carefully calibrated noise can be incorporated into the aggregated answers.
    
- Randomisation
    
Adding sufficient noise to training data can make it effectively uncrecognizable, which of course needs to be weighed against the inaccuracy that this typically creates. See also TRAINDATADISTORTION against data poisoning and EVASIONROBUSTMODEL for randomisation against evasion attacks.
    
- Objective function perturbation
    
In privacy-preserving machine learning, objective function perturbation is a technique to enhance training data privacy. It introduces noise or modifications to the objective function, adding controlled randomness to make it difficult for adversaries to extract specific details about individual data points. This method contributes to achieving differential privacy, preventing the undue influence of a single data point on the model's behavior.

- Masking
    
Masking encompasses the intentional concealment or modification of sensitive information within training datasets to enhance privacy during the development of machine learning models. This is achieved by introducing a level of obfuscation through techniques like data masking or feature masking, where certain elements are replaced, encrypted, or obscured, preventing unauthorized access to specific details. This approach strikes a balance between extracting valuable data insights and safeguarding individual privacy, contributing to a more secure and privacy-preserving data science process. 
    
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


  

  Links to standards:

  - Not covered yet in ISO/IEC standards. 

#### #DISCRETE
(management, development-time and runtime). Minimize access to technical details that could help attackers.

Purpose: reduce the information available to attackers, which can assist them in selecting and tailoring their attacks, thereby lowering the probability of a successful attack.

Note: this control needs to be weighed against the AITRANSPARENCY control that requires to be more open about technical aspects of the model. The key is to minimize information that can help attackers while being transparent.

For example:

  - Be careful with publishing technical articles on your solution
  - When choosing a model type or model implementation, take into account that there is an advantage of having technology with which attackers are less familiar
  - Minimize model output regarding technical details

Particularity: Technical data science details need to be incorporated in asset management, data classification and hence in risk analysis.

Links to standards:

  - 27002 Control 5.9: Inventory of information and other associated assets. Gap: covers this control fully, with the obvious particularity that technical data science details can be sensitive. As soon as the inventory identifies this, depending processes such as security requirements, risk analysis and awareness traing will take care of the threat. In other words: it starts with identifying this information as an asset.
  - See [OpenCRE on data classification and handling](https://www.opencre.org/cre/074-873). Gap: idem
  - [MITRE ATlAS Acquire Public ML Artifacts](https://atlas.mitre.org/techniques/AML.T0002)

---

## 1.3. Controls to limit the effects of unwanted behaviour

The cause of unwanted model behaviour can be the result of various factors, including model use, development time, and run-time. Preventative controls for these are discussed in their corresponding sections. However, the controls to mitigate the impact of such behavior are general for each of these threats and are covered in this section.

Main potential causes of unwanted model behaviour:

- Insufficient or incorrect training data
- Model staleness/ Model drift (i.e. the model becoming outdated)
- Mistakes during model and data engineering
- Security threats: attacks as laid out in this document, e.g. model poisoning, evasion attacks

Successfully mitigating unwanted model behaviour knows the following threats:

- Overreliance: the model is being trusted too much by users
- Excessive agency: the model is being trusted too much by engineers and gets excessive functionality, permissions, or autonomy

Example: The typical use of plug-ins in Large Language Models (GenAI) presents specific risks concerning the protection and privileges of these plug-ins. This is because they enable Large Language Models (LLMs, a GenAI) to perform actions beyond their normal interactions with users. ([OWASP for LLM 07](https://llmtop10.com/llm07/))

Example: LLMs (GenAI), just like most AI models, induce their results based on training data, meaning that they can make up things that are false. In addition, the training data can contain false or outdated information. At the same time, LLMs (GenAI) can come across very confident about their output. These aspects make overreliance of LLM (GenAI) ([OWASP for LLM 09](https://llmtop10.com/llm09/)) a real risk, plus excessive agency as a result of that ([OWASP for LLM 08](https://llmtop10.com/llm08/)). Note that all AI models in principle can suffer from overreliance - not just Large Language Models.

**Controls to limit the effects of unwanted model behaviour:**

#### #OVERSIGHT
(runtime). Oversight of model behaviour by humans or business logic (guardrails).
  
Purpose: Detect unwanted model behavior and correct or halt the execution of a model's decision. Note: Unwanted model behavior often cannot be entirely specified, limiting the effectiveness of guardrails.
  
Examples:

  - Logic preventing the trunk of a car from opening while the car is moving, even if the driver seems to request it
  - Requesting user confirmation before sending a large number of emails as instructed by a model
  - A special form of guardrails is censoring unwanted output of GenAI models (e.g. violent, unethical)
Links to standards:

  - ISO/IEC 42001 B.9.3 defines controls for human oversight and decisions regarding autonomy. Gap: covers this control partly (human oversight only, not business logic)
  - Not covered further in ISO/IEC standards. 

#### #LEASTMODELPRIVILEGE
(runtime infosec). Least model privilege: Minimize privileges; avoid connecting a model to an email facility to prevent it from sending incorrect information to others.

Links to standards:

  - 27002 control 8.2 Privileged access rights. Gap: covers this control fully, with the particularity that privileges assigned to autonomous model decisions need to be assigned with the risk of unwanted model behaviour in mind.
  - [OpenCRE on least privilege](https://www.opencre.org/cre/368-633) Gap: idem

#### #AITRANSPARENCY
(runtime, management). AI transparency: By being transparent with users about the rough workings of the model, its training process, and the general expected accuracy and reliability of the AI system's output, people can adjust their reliance ([OWASP for LLM 09](https://llmtop10.com/llm09/)) on it accordingly. The simplest form of this is to inform users that an AI model is being involved.

See the DISCRETE control for the balance between being transparent and being discrete about the model. Transparency here is about providing abstract information regarding the model and is therefore something else than _explainability_.

Links to standards:

  - ISO/IEC 42001 B.7.2 describes data management to support transparency. Gap: covers this control minimally, as it only covers the data mnanagement part.
  - Not covered further in ISO/IEC standards. 

#### #CONTINUOUSVALIDATION

(datascience). Continuous validation: by frequently testing the behaviour of the model against an appropriate test set, sudden changes caused by a permanent attack (e.g. data poisoning, model poisoning) can be detected.

Links to standards:

- ISO 5338 (AI lifecycle) Continuous validation. Gap: covers this control fully

#### #EXPLAINABILITY 
(runtime datascience). Explaining how individual model decisions are made, a field referred to as Explainable AI (XAI), can aid in gaining user trust in the model. In some cases, this can also prevent overreliance, for example, when the user observes the simplicity of the 'reasoning' or even errors in that process. See [this Stanford article on explainability and overreliance](https://hai.stanford.edu/news/ai-overreliance-problem-are-explanations-solution). Explanations of how a model works can also aid security assessors to evaluate AI security risks of a model.

#### #UNWANTEDBIASTESTING 
(datascience). Unwanted bias testing: by doing test runs of the model to measure unwanted bias, unwanted behaviour caused by an attack can be detected. The details of bias detection fall outside the scope of this document as it is not a security concern - other than that an attack on model behaviour can cause bias.
