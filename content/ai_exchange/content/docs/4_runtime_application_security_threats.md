---
title: 4. Runtime application security threats
heroTitle: "Runtime application security threats"
heroText: "Attacks to the AI system in operation apart from the input attacks, and protective controls"
weight: 5
---
> Category: group of runtime threats  
> Permalink: https://owaspai.org/goto/runtimeappsec/

An AI system is an IT system, so at runtime it can be vulnerable to any security attack - for example to break into the application's user database. These attacks, and their countermeasures are covered in many other resources. This section focuses only on what is AI-specific.  

[Section 2](/goto/threatsuse/) covers runtime attacks that are not conventrionl: attacks performed through inference - by using the system and providing model input. [Section 3](/goto/developmenttime/) covers attacks during development-time.  

So, this section covers conventional application security attacks that have AI-specific consequences. For example: changing model behaviour by hacking into a runtime database of augmentation data. The details of how these attacks are performed are covered in many other resources. This section focuses on the AI-specific consequences and the categories of controls required. In-depth coverage of controls against conventional attacks are covered in many other resources. This section focuses on AI-specific aspects of these controls, such as the option of using a Trusted Execution Environment for models.  

The subsections cover non-AI-specific threats, model poisoning, model theft, insecure output handling, leaking input data, and attacks on augmentation data.

## 4.1. Non AI-specific application security threats
> Category: group of runtime threats  
> Permalink: https://owaspai.org/goto/generalappsecthreats/

**Description**  
Impact: Conventional application security threats can impact confidentiality, integrity and availability of all assets.

AI systems are IT systems and therefore can have security weaknesses and vulnerabilities that are not AI-specific such as SQL-Injection. Such topics are covered in depth by many sources and are out of scope for this publication.  
Note: some controls in this document are application security controls that are not AI-specific, but applied to AI-specific threats (e.g., monitoring to detect model attacks).

**Controls**

- See the [Governance controls](/goto/governancecontrols/) in the general section, in particular [SECDEVPROGRAM](/goto/secdevprogram/) to attain application security, and [SECPROGRAM](/goto/secprogram/) to attain information security in the organization.
- Technical application security controls  
  Useful standards include:
  - See [OpenCRE on technical application security controls](https://www.opencre.org/cre/636-660)
  - The ISO 27002 controls only partly cover technical application security controls, and on a high abstraction level
  - More detailed and comprehensive control overviews can be found in for example, Common criteria protection profiles (ISO/IEC 15408 with evaluation described in ISO 18045),
  - or in [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- Operational security  
  When models are hosted by third parties then security configuration of those services deserves special attention. Part of this configuration is [model access control](/goto/modelaccesscontrol/):  an important mitigation for security risks. Cloud AI configuration options deserve scrutiny, like for example opting out when necessary of monitoring by the third party - which could increase the risk of exposing sensitive data.
  Useful standards include:
  - See [OpenCRE on operational security processes](https://www.opencre.org/cre/862-452)
  - The ISO 27002 controls only partly cover operational security controls, and on a high abstraction level

---

## 4.2. Runtime model poisoning (manipulating the model itself or its input/output logic)
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/runtimemodelpoison/

**Description**  
Impact: see Broad model poisoning.

This threat involves manipulating the behavior of the model by altering the parameters within the live system itself. These parameters represent the regularities extracted during the training process for the model to use in its task, such as neural network weights. Alternatively, compromising the model's input or output logic can also change its behavior or deny its service.

**Controls**  

- See [General controls](/goto/generalcontrols/)
- The below control(s), each marked with a # and a short name in capitals

#### #RUNTIME MODEL INTEGRITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/runtimemodelintegrity/

**Description**  
Run-time model integrity: apply traditional application security controls to protect the storage of model parameters (e.g., access control, checksums, encryption) A Trusted Execution Environment can help to protect model integrity.

#### #RUNTIME MODEL IO INTEGRITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/runtimemodeliointegrity/

**Description**  
Run-time model Input/Output integrity: apply traditional application security controls to protect the runtime manipulation of the model's input/output logic (e.g., protect against a man-in-the-middle attack)

---

## 4.3. Direct runtime model theft
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/runtimemodeltheft/

**Description**  
Impact:  Confidentiality breach of the model (i.e., model parameters), which can be:
- intellectual property theft (e.g., by a competitor)
- and/or a way to perform input attacks on the copied model, circumventing protections. These protections include rate limiting, access control, and detection mechanisms. This can be done for [all input attacks](/goto/inputthreats/) that extract data, and for the preparation of [evasion](/goto/evasion/) or [prompt injection](/goto/promptinjection): experimenting to find attack inputs that work.
 
This attack occurs when stealing model parameters from a live system by breaking into it (e.g., by gaining access to executables, memory or other storage/transfer of  parameter data in the production environment). This is different from [model exfiltration](/goto/modelexfiltration/) which goes through a number of steps to steal a model through normal use, hence the use of the word 'direct'. It is also different from [direct model theft development-time](/goto/devmodelleak/) from a lifecycle and attack surface perspective.

This attack also includes _side-channel attacks_, where attackers do not necessarily steal the entire model but instead extract specific details about the model’s behaviour or internal state. By observing characteristics like response times, power consumption, or electromagnetic emissions during inference, attackers can infer sensitive information about the model. This type of attack can provide insights into the model's structure, the type of data it processes, or even specific parameter values, which may be leveraged for subsequent attacks or to replicate the model.


**Risk identification**  
This threat applies if the model represents intellectual property (i.e., a trade secret), or the risk of any input attack applies - with the exception of the model being publicly available because then there is no need to steal it.

**Controls**

- [General controls](/goto/generalcontrols/),
  - especially [Sensitive data limitation](/goto/dataminimize/)
- [#MODEL WATERMARKING](/goto/modelwatermarking/)
- The below control(s), each marked with a # and a short name in capitals
  
#### #RUNTIME MODEL CONFIDENTIALITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/runtimemodelconfidentiality/

**Description**  
Run-time model confidentiality: see [SECDEVPROGRAM](/goto/secdevprogram/) to attain application security, with the focus on protecting the storage of model parameters (e.g., access control, encryption).  

A Trusted Execution Environment can be highly effective in safeguarding the runtime environment, isolating model operations from potential threats, including side-channel hardware attacks like [DeepSniffer](https://sites.cs.ucsb.edu/~sherwood/pubs/ASPLOS-20-deepsniff.pdf). By ensuring that sensitive computations occur within this secure enclave,the TEE reduces the risk of attackers gaining useful information through side-channel methods.

Side-Channel Mitigation Techniques:
- Masking: Introducing random delays or noise during inference can help obscure the relationship between input data and the model’s response times, thereby complicating timing-based side-channel attacks. See [Masking against Side-Channel Attacks: A Formal Security Proof](https://www.iacr.org/archive/eurocrypt2013/78810139/78810139.pdf)

- Shielding: Employing hardware-based shielding could help prevent electromagnetic
or acoustic leakage that might be exploited for side-channel attacks. See [Electromagnetic Shielding for Side-Channel Attack Countermeasures](https://ieeexplore.ieee.org/document/8015660)


#### #MODEL OBFUSCATION
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/modelobfuscation/

**Description**  
Model obfuscation: techniques to store the model in a complex and confusing way with minimal technical information, to make it more difficult for attackers to extract and understand a model after having gained access to its runtime storage. See this [article on ModelObfuscator](https://dl.acm.org/doi/abs/10.1145/3597926.3598113)

---

## 4.4. Insecure output handling
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/insecureoutput/

**Description**  
Impact: Textual model output may contain 'traditional' injection attacks such as XSS-Cross site scripting, which can create a vulnerability when processed (e.g., shown on a website, execute a command).

This is like the standard output encoding issue, but the particularity is that the output of AI may include attacks such as XSS.

**References**  
See [OWASP for LLM 05](https://genai.owasp.org/llmrisk/llm05/).

**Controls:**

- The below control(s), each marked with a # and a short name in capitals

#### #ENCODE MODEL OUTPUT
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/encodemodeloutput/

**Description**  
Encode model output: apply output encoding on model output if it text. See [OpenCRE on Output encoding and injection prevention](https://www.opencre.org/cre/161-451)

---

## 4.5. Leak sensitive input data
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/leakinput/

**Description**  
Impact: Confidentiality breach of sensitive input data.

Input data can be sensitive (e.g., GenAI prompts) and can either leak through a failure or through an attack, such as a man-in-the-middle attack.  

GenAI models mostly live in the cloud - often managed by an external party, which may increase the risk of leaking training data and leaking prompts. This issue is not limited to GenAI, but GenAI has 2 particular risks here: 1) model use involves user interaction through prompts, adding user data and corresponding privacy/sensitivity issues, and 2) GenAI model input (prompts) can contain rich context information with sensitive data (e.g., company secrets). The latter issue occurs with *in context learning* or *Retrieval Augmented Generation(RAG)* (adding background information to a prompt): for example data from all reports ever written at a consultancy firm. First of all, this context information will travel with the prompt to the cloud, and second: the context information may likely leak to the output, so it's important to apply the access rights of the user to the retrieval of the context. For example: if a user from department X asks a question to an LLM - it should not retrieve context that department X has no access to, because that information may leak in the output. Also see [Risk analysis](https://owaspai.org/docs/ai_security_overview/#how-to-select-relevant-threats-and-controls-risk-analysis) on the responsibility aspect.

**Controls**
- See [General controls](/goto/generalcontrols/), in particular [Minimizing data](/goto/datalimit/)
- The below control(s), each marked with a # and a short name in capitals

#### #MODEL INPUT CONFIDENTIALITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/modelinputconfidentiality/

**Description**  
Model input confidentiality: see [SECDEVPROGRAM](/goto/secdevprogram/) to attain application security, with the focus on protecting the transport and storage of model input (e.g., access control, encryption, minimize retention)

---

## 4.6. Leak sensitive augmentation data
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/leakaugmentation/

**Description**  
Impact: Confidentiality breach of sensitive augmentation data

Augmentation data (ad hoc retrieved information inserted into a prompt), for example for Retrieval Augmented Generation, is typically stored in _vector databases_. This increases the attack surface for any sensitive data, since it's stored outside its regular storage with the regular protection (e.g., company reports) and therefore requires additional protection.   
See [Leak sensitive input data](/goto/leakinput/) for how augmentation data can leak when it's added to the prompt. The best practice is to assume that augmentation data can leak to the output, so the access rights for that data need to align with the rights of the user(s) that can see the output.  
So-called _vectors_ that form a representation of augmentation data are typically vulnerable for extracting information and should therefore be included in protection.

**References**
- [Mitigating Security Risks in RAG LLM Applications, November 2023, CSA](https://cloudsecurityalliance.org/blog/2023/11/22/mitigating-security-risks-in-retrieval-augmented-generation-rag-llm-applications)

**Controls**
- See [General controls](/goto/generalcontrols/)
- The below control(s), each marked with a # and a short name in capitals

#### #AUGMENTATION DATA CONFIDENTIALITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/augmentationdataconfidentiality/

**Description**  
See the [security program](/goto/secprogram/) and [application security](/goto/secdevprogram/), [development environment security](/goto/devsecurity/), and [data segregation](/goto/segregatedata/) to attain protect the confidentiality of transporting and storing agumentation data (e.g., access control, encryption, minimize retention).



---

## 4.7. Manipulate augmentation data
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/manipulateaugmentation/

**Description**  

Impact: Augmentation data is altered to manipulate model behaviour.

Augmentation data (background information added to a prompt) is typically stored in _vector databases_. When augmentation data is manipulated (e.g., inserting false information), it can change the output of the model - making it very similar to [data poisoning](/goto/datapoison/).

**References**
- [Mitigating Security Risks in RAG LLM Applications, November 2023, CSA](https://cloudsecurityalliance.org/blog/2023/11/22/mitigating-security-risks-in-retrieval-augmented-generation-rag-llm-applications)

**Controls**
- See [General controls](/goto/generalcontrols/)
- The below control(s), each marked with a # and a short name in capitals

#### #AUGMENTATION DATA INTEGRITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/augmentationdataintegrity/

**Description**  
See the [security program](/goto/secprogram/) and [application security](/goto/secdevprogram/), [development environment security](/goto/devsecurity/), and [data segregation](/goto/segregatedata/) to attain protect the integrity of transporting and storing agumentation data (e.g., access control, encryption, minimize retention).



