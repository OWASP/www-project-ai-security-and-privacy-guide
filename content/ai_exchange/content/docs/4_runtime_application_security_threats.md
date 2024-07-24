---
title: 4. Runtime application security threats
weight: 5
---

## 4.1. Non AI-specific application security threats
> Category: group of runtime threats  
> Permalink: https://owaspai.org/goto/generalappsecthreats/

Impact: Conventional application security threats can impact confidentiality, integrity and availability of all assets.

AI systems are IT systems and therefore can have security weaknesses and vulnerabilities that are not AI-specific such as SQL-Injection. Such topics are covered in depth by many sources and are out of scope for this publication.  
Note: some controls in this document are application security controls that are not AI-specific, but applied to AI-specific threats (e.g. monitoring to detect model attacks).

**Controls:**

- See the [Governance controls](/goto/governancecontrols/) in the general section, in particular [SECDEVPROGRAM](/goto/secdevprogram/) to attain application security, and [SECPROGRAM](/goto/secprogram/) to attain information security in the organization.
- Technical application security controls  
  Links to standards:
  - See [OpenCRE on technical application security controls](https://www.opencre.org/cre/636-660)
  - The ISO 27002 controls only partly cover technical application security controls, and on a high abstraction level
  - More detailed and comprehensive control overviews can be found in for example Common criteria protection profiles (ISO/IEC 15408 with evaluation described in ISO 18045),
  - or in [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- Operational security  
  When models are hosted by third parties then security configuration of those services deserves special attention. Part of this configuration is [model access control](/goto/modelaccesscontrol/):  an important mitigation for security risks. Cloud AI configuation options deserve scrutiny, like for example opting out when necessary of monitoring by the third party - which could increase the risk of exposing sensitive data.
  Links to standards:
  - See [OpenCRE on operational security processes](https://www.opencre.org/cre/862-452)
  - The ISO 27002 controls only partly cover operational security controls, and on a high abstraction level

---

## 4.2. Runtime model poisoning (manipulating the model itself or its input/output logic)
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/runtimemodelpoison/

Impact: see Broad model poisoning.

This threat involves manipulating the behavior of the model by altering the parameters within the live system itself. These parameters represent the regularities extracted during the training process for the model to use in its task, such as neural network weights. Alternatively, compromising the model's input or output logic can also change its behavior or deny its service.

**Controls:**

- See [General controls](/goto/generalcontrols/)
- The below control(s), each marked with a # and a short name in capitals

#### #RUNTIMEMODELINTEGRITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/runtimemodelintegrity/

Run-time model integrity: apply traditional application security controls to protect the storage of model parameters (e.g. access control, checksums, encryption) A Trusted Execution Environment can help to protect model integrity.

#### #RUNTIMEMODELIOINTEGRITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/runtimemodeliointegrity/

Run-time model Input/Output integrity: apply traditional application security controls to protect the runtime manipulation of the model's input/output logic (e.g. protect against a man-in-the-middle attack)

---

## 4.3. Direct runtime model theft
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/runtimemodeltheft/

Impact: Confidentiality breach of model parameters, which can result in intellectual model theft and/or allowing to perform model attacks on the stolen model that normally would be mitigated by rate limiting, access control, or detection mechanisms.

Stealing model parameters from a live system by breaking into it (e.g. by gaining access to executables, memory or other storage/transfer of  parameter data in the production environment). This is different from [model theft through use](/goto/modeltheftuse/) which goes through a number of steps to steal a model through normal use, hence the use of the word 'direct'.

**Controls:**

- See [General controls](/goto/generalcontrols/)
- The below control(s), each marked with a # and a short name in capitals
  
#### #RUNTIMEMODELCONFIDENTIALITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/runtimemodelconfidentiality/

Run-time model confidentiality: see [SECDEVPROGRAM](/goto/secdevprogram/) to attain application security, with the focus on protecting the storage of model parameters (e.g. access control, encryption).  
A Trusted Execution Environment can help to protect against attacks, including side-channel hardware attacks like [DeepSniffer](https://sites.cs.ucsb.edu/~sherwood/pubs/ASPLOS-20-deepsniff.pdf).

#### #MODELOBFUSCATION
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/modelobfuscation/

Model obfuscation: techniques to store the model in a complex and confusing way with minimal technical information, to make it more difficult for attackers to extract and understand a model after having gained acces to its runtime storage. See this [article on ModelObfuscator](https://dl.acm.org/doi/abs/10.1145/3597926.3598113)

---

## 4.4. Insecure output handling
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/insecureoutput/

Impact: Textual model output may contain 'traditional' injection attacks such as XSS-Cross site scripting, which can create a vulnerability when processed (e.g. shown on a website, execute a command).

This is like the standard output encoding issue, but the particularity is that the output of AI may include attacks such as XSS.

See [OWASP for LLM 02](https://genai.owasp.org/llmrisk/llm02/).

**Controls:**

- The below control(s), each marked with a # and a short name in capitals

#### #ENCODEMODELOUTPUT
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/encodemodeloutput/

Encode model output: apply output encoding on model output if it text. See [OpenCRE on Output encoding and injection prevention](https://www.opencre.org/cre/161-451)

---

## 4.5. Leak sensitive input data
> Category: runtime application security threat  
> Permalink: https://owaspai.org/goto/leakinput/

Impact: Confidentiality breach of sensitive input data.

Input data can be sensitive (e.g. GenAI prompts) and can either leak through a failure or through an attack, such as a man-in-the-middle attack.  

GenAI models mostly live in the cloud - often managed by an external party, which may increase the risk of leaking training data and leaking prompts. This issue is not limited to GenAI, but GenAI has 2 particular risks here: 1) model use involves user interaction through prompts, adding user data and corresponding privacy/sensitivity issues, and 2) GenAI model input (prompts) can contain rich context information with sensitive data (e.g. company secrets). The latter issue occurs with *in context learning* or *Retrieval Augmented Generation(RAG)* (adding background information to a prompt): for example data from all reports ever written at a consultancy firm. First of all, this context information will travel with the prompt to the cloud, and second: the context information may likely leak to the output, so it's important to apply the access rights of the user to the retrieval of the context. For example: if a user from department X asks a question to an LLM - it should not retrieve context that department X has no access to, because that information may leak in the output. Also see [Risk analysis](https://owaspai.org/docs/ai_security_overview/#how-to-select-relevant-threats-and-controls-risk-analysis) on the responsbility aspect.

**Controls:**
- See [General controls](/goto/generalcontrols/), in particular [Minimizing data](/goto/datalimit/)
- The below control(s), each marked with a # and a short name in capitals

#### #MODELINPUTCONFIDENTIALITY
> Category: runtime information security control against application security threats  
> Permalink: https://owaspai.org/goto/modelinputconfidentiality/

Model input confidentiality: see [SECDEVPROGRAM](/goto/secdevprogram/) to attain application security, with the focus on protecting the transport and storage of model input (e.g. access control, encryption, minimize retention)
