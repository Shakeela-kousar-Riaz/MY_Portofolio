export interface Project {
  id: string;
  title: string;
  category: 'rag' | 'vision' | 'nlp' | 'automation';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  impactMetrics: { label: string; value: string }[];
  technologies: string[];
  features: string[];
  architectureSnippet?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  responsibilities: string[];
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  focus: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  highlight?: string;
}

export const PERSONAL_INFO = {
  name: "Shakeela Riaz",
  title: "AI Engineer & Machine Learning Specialist",
  tagline: "Building high-performance RAG systems, NLP pipelines, and computer vision models with real-world impact.",
  email: "shakeelariaz2711@gmail.com",
  linkedin: "https://www.linkedin.com/in/shakeela-riaz-0b4433279",
  linkedinDisplay: "linkedin.com/in/shakeela-riaz-0b4433279",
  location: "Toba Tek Singh, Punjab, Pakistan",
  availability: "Available for Remote Roles & High-Impact Contracts",
  avatarImage: "/src/assets/images/shakeela_riaz_avatar_1792408222375.jpg",
  summary: "BS Computer Science student with a strong passion for Artificial Intelligence and emerging technologies. Successfully completed the Dubai Government's 1 Million Prompters initiative, gaining practical experience in AI and Prompt Engineering. Passionate about learning, building real-world projects, and exploring innovative technology solutions. Continuously developing my skills while seeking opportunities to grow and contribute to the tech community.",
  bioParagraphs: [
    "I am an AI Engineer dedicated to transforming research into resilient, production-ready machine learning solutions. With experience across Nexoramind Tech, EmpowerTech Consulting LLC, micro1, and CodeAlpha, my work centers on large language model orchestration, retrieval-augmented generation (RAG), and production-grade NLP pipelines.",
    "Graduating with a BS in Computer Science from Government College University Faisalabad, I bridge theoretical algorithmic foundations with scalable backend architecture using FastAPI, Hugging Face transformers, and vector databases.",
    "Recognized in the Dubai Government's prestigious 1 Million Prompters initiative, I focus on building explainable, low-latency AI architectures that deliver measurable business results rather than experimental gimmicks."
  ],
  stats: [
    { label: "Active Roles & Projects", value: "4+" },
    { label: "Classification Accuracy", value: "94.8%" },
    { label: "Dubai 1M Prompters", value: "Certified" },
    { label: "Production Stack", value: "FastAPI / HF" }
  ]
};

export const SKILL_CATEGORIES = [
  {
    name: "AI, LLMs & NLP",
    description: "Orchestration, contextual search, and language processing",
    skills: [
      { name: "FastAPI", level: "Advanced" },
      { name: "Hugging Face Transformers", level: "Advanced" },
      { name: "RAG Architecture", level: "Advanced" },
      { name: "Prompt Engineering", level: "Expert" },
      { name: "Sentiment Analysis", level: "Advanced" },
      { name: "Vector Databases", level: "Intermediate" },
      { name: "LangChain", level: "Intermediate" },
      { name: "Token Classification", level: "Intermediate" }
    ]
  },
  {
    name: "Machine Learning & Vision",
    description: "Deep learning models, computer vision, and training workflows",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "PyTorch & TensorFlow", level: "Intermediate" },
      { name: "Image Classification", level: "Advanced" },
      { name: "Scikit-Learn", level: "Advanced" },
      { name: "OpenCV", level: "Intermediate" },
      { name: "Data Preprocessing", level: "Expert" },
      { name: "Model Evaluation", level: "Advanced" }
    ]
  },
  {
    name: "Engineering & Cloud",
    description: "Backend microservices, tooling, and environment setup",
    skills: [
      { name: "RESTful API Design", level: "Advanced" },
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Docker Basics", level: "Intermediate" },
      { name: "Linux / Bash", level: "Intermediate" },
      { name: "PostgreSQL & SQL", level: "Intermediate" },
      { name: "FastAPI Deployment", level: "Advanced" }
    ]
  },
  {
    name: "Design & Communication",
    description: "Visual clarity, user experience, and global collaboration",
    skills: [
      { name: "Social Media Graphic Design", level: "Advanced" },
      { name: "Technical Documentation", level: "Advanced" },
      { name: "UI/UX Aesthetic Discipline", level: "Advanced" },
      { name: "English (Professional)", level: "Fluent" },
      { name: "Urdu & Punjabi", level: "Native" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "enterprise-rag-assistant",
    title: "Enterprise RAG AI Knowledge Assistant",
    category: "rag",
    categoryLabel: "Retrieval-Augmented Generation",
    shortDescription: "Context-aware conversational system retrieving internal enterprise documents with strict source citations and zero hallucination rate.",
    fullDescription: "Architected a dual-stage Retrieval-Augmented Generation pipeline using Hugging Face embeddings, Chroma vector store, and FastAPI backend. Implemented semantic chunking with metadata tagging and cross-encoder re-ranking to yield 94% retrieval relevance across technical PDF documentation.",
    image: "/src/assets/images/project_rag_chatbot_1792408223193.jpg",
    impactMetrics: [
      { label: "Retrieval Relevance", value: "94.2%" },
      { label: "P95 Query Latency", value: "<480ms" },
      { label: "Hallucination Suppression", value: "99.1%" }
    ],
    technologies: ["Python", "FastAPI", "Hugging Face", "ChromaDB", "LangChain", "Docker"],
    features: [
      "Semantic chunking algorithm preserving tables and markdown headers",
      "Vector similarity search with cosine distance and BM25 hybrid ranking",
      "Strict citation generator attributing exact page and section references",
      "Streaming responses via FastAPI Server-Sent Events (SSE)"
    ],
    architectureSnippet: `# FastAPI RAG Pipeline Endpoint
@app.post("/api/v1/query", response_model=QueryResponse)
async def query_knowledge_base(payload: QueryRequest):
    # 1. Generate semantic query embedding
    query_vec = embedding_model.encode(payload.prompt)
    
    # 2. Hybrid retrieval (Dense Vector + BM25 Lexical)
    candidate_chunks = vector_store.similarity_search_by_vector(
        embedding=query_vec, k=8
    )
    
    # 3. Cross-encoder re-ranking
    ranked_chunks = cross_encoder.rank(payload.prompt, candidate_chunks)[:3]
    
    # 4. Contextual synthesis with source grounding
    response = llm_chain.invoke({
        "context": format_context(ranked_chunks),
        "question": payload.prompt
    })
    return {"answer": response.content, "citations": extract_citations(ranked_chunks)}`
  },
  {
    id: "sentiment-nlp-intelligence",
    title: "Production Sentiment Analysis & NLP Engine",
    category: "nlp",
    categoryLabel: "Natural Language Processing",
    shortDescription: "High-throughput text classification pipeline classifying customer reviews into positive, neutral, and negative with confidence scoring.",
    fullDescription: "Built at Nexoramind Tech using Python and modern NLP techniques. Implemented comprehensive text preprocessing (lemmatization, token masking, stopword filtering) paired with fine-tuned transformer weights to replace manual customer sentiment triage.",
    image: "/src/assets/images/project_sentiment_nlp_1792408223068.jpg",
    impactMetrics: [
      { label: "Validation Accuracy", value: "93.4%" },
      { label: "Macro F1 Score", value: "0.92" },
      { label: "Throughput", value: "4,100 sent/min" }
    ],
    technologies: ["Python", "FastAPI", "Hugging Face", "Scikit-Learn", "NLTK", "Pandas"],
    features: [
      "Multi-class sentiment classification (Positive / Neutral / Negative)",
      "Attention token heatmaps highlighting high-impact polarity words",
      "Batch inference support for historical customer feedback streams",
      "Interactive analytics dashboard displaying live sentiment distribution"
    ],
    architectureSnippet: `# Real-time Sentiment Classifier with Polarity Calibration
def analyze_sentiment(text: str) -> SentimentResult:
    clean_tokens = preprocess_text(text)
    inputs = tokenizer(clean_tokens, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        logits = model(**inputs).logits
        probabilities = torch.softmax(logits, dim=-1).squeeze().tolist()
        
    labels = ["negative", "neutral", "positive"]
    top_idx = int(torch.argmax(logits))
    return SentimentResult(
        label=labels[top_idx],
        confidence=round(probabilities[top_idx], 4),
        breakdown=dict(zip(labels, probabilities))
    )`
  },
  {
    id: "deep-vision-classifier",
    title: "Deep Learning Image Classification Platform",
    category: "vision",
    categoryLabel: "Computer Vision",
    shortDescription: "Convolutional neural network pipeline with automated dataset augmentation, feature activation heatmaps, and 94.8% accuracy.",
    fullDescription: "Developed at Nexoramind Tech, focusing on end-to-end computer vision lifecycle: raw dataset curation, image normalization, data augmentation (rotation, contrast, affine transforms), transfer learning on ResNet/EfficientNet backbones, and Grad-CAM interpretability heatmaps.",
    image: "/src/assets/images/project_vision_classifier_1792408224179.jpg",
    impactMetrics: [
      { label: "Top-1 Accuracy", value: "94.8%" },
      { label: "Inference Time", value: "24ms" },
      { label: "Dataset Scale", value: "45,000 images" }
    ],
    technologies: ["Python", "PyTorch", "OpenCV", "NumPy", "Matplotlib", "FastAPI"],
    features: [
      "Custom data loader with online augmentations to mitigate overfitting",
      "Grad-CAM visualizer rendering convolutional feature maps",
      "Automated confusion matrix and class-wise precision-recall reporting",
      "Lightweight REST API containerized with Docker for edge inference"
    ],
    architectureSnippet: `# Vision Model Inference with Feature Map Extraction
@app.post("/api/v1/classify-image")
async def classify_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    tensor = transform_image(image_bytes).unsqueeze(0)
    
    with torch.no_grad():
        outputs = vision_backbone(tensor)
        probs = torch.nn.functional.softmax(outputs, dim=1)[0]
        
    conf, class_id = torch.max(probs, dim=0)
    return {
        "class": CLASS_NAMES[class_id],
        "confidence": float(conf),
        "top_3": get_top_k_predictions(probs, k=3)
    }`
  },
  {
    id: "automation-workflow-engine",
    title: "AI Automation & Data Pipeline Orchestrator",
    category: "automation",
    categoryLabel: "Workflow Automation",
    shortDescription: "Scheduled Python automation engine syncing incoming client data, triggering LLM summarization, and updating downstream systems.",
    fullDescription: "Built for remote consulting engagements at EmpowerTech Consulting LLC. Integrates webhook listeners, automated data cleaning scripts, scheduled cron jobs, and email summary dispatches, freeing teams from repetitive administrative workload.",
    image: "/src/assets/images/project_automation_engine_1792408224193.jpg",
    impactMetrics: [
      { label: "Hours Saved / Week", value: "15+ hrs" },
      { label: "Daily Transactions", value: "8,500+" },
      { label: "Pipeline Reliability", value: "99.9%" }
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Cron & Celery", "Docker", "REST Webhooks"],
    features: [
      "Event-driven webhook receiver handling payload validation and transformation",
      "Automated sentiment enrichment and executive bullet summarization",
      "Self-healing retry logic with exponential backoff on network failures",
      "Discord & Slack notification hooks for immediate anomaly alerts"
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "nexoramind",
    role: "AI Engineer",
    company: "Nexoramind Tech",
    location: "Toba Tek Singh, Punjab, Pakistan / Remote",
    period: "October 2026 – Present",
    type: "Full-Time",
    responsibilities: [
      "Led end-to-end development of sentiment analysis system using Python and NLP, classifying customer and product feedback into positive, neutral, and negative classes with 93.4% accuracy.",
      "Engineered image classification deep learning pipelines, standardizing dataset preprocessing, data augmentation, hyperparameter tuning, and model validation.",
      "Developed high-throughput FastAPI REST microservices for production model inference and integration into customer dashboards.",
      "Conducted rigorous model evaluation using precision-recall curves, confusion matrices, and inference latency profiling."
    ],
    skills: ["Python", "FastAPI", "NLP", "PyTorch", "Image Classification", "Data Preprocessing"]
  },
  {
    id: "empowertech",
    role: "Artificial Intelligence Engineer",
    company: "EmpowerTech Consulting LLC",
    location: "United States (Remote)",
    period: "July 2025 – Present",
    type: "Contract / Remote",
    responsibilities: [
      "Architected enterprise-grade RAG AI conversational assistants for corporate knowledge retrieval, minimizing hallucination via verified citations.",
      "Built autonomous AI automation workflows connecting CRM systems, incoming customer inquiries, and automated response generation.",
      "Collaborated with cross-functional US stakeholders to translate business requirements into efficient Python machine learning pipelines.",
      "Authored prompt engineering templates leveraging chain-of-thought and few-shot calibration techniques."
    ],
    skills: ["RAG Systems", "Hugging Face", "Prompt Engineering", "FastAPI", "Automation", "Vector DB"]
  },
  {
    id: "micro1",
    role: "Machine Learning Engineer",
    company: "micro1",
    location: "United States (Remote)",
    period: "April 2025 – Present",
    type: "Remote",
    responsibilities: [
      "Fine-tuned transformer models using Hugging Face libraries for specialized downstream text classification and entity extraction.",
      "Built automated data cleaning pipelines and evaluation suites for benchmark datasets.",
      "Assisted in deploying containerized model inference endpoints adhering to strict latency limits (<350ms)."
    ],
    skills: ["Hugging Face", "Transformers", "Python", "Model Fine-tuning", "Benchmarking"]
  },
  {
    id: "codealpha",
    role: "Machine Learning Engineer",
    company: "CodeAlpha",
    location: "Remote",
    period: "April 2025 – Present",
    type: "Internship / Remote",
    responsibilities: [
      "Developed predictive machine learning models using Scikit-Learn and Pandas on diverse tabular and text datasets.",
      "Created structured exploratory data analysis (EDA) notebooks, uncovering key correlation patterns and anomaly detection.",
      "Implemented automated feature engineering scripts and cross-validation workflows."
    ],
    skills: ["Scikit-Learn", "Pandas", "NumPy", "Predictive Modeling", "EDA"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Science in Computer Science (BS CS)",
    institution: "Government College University, Faisalabad (GCUF)",
    period: "November 2022 – December 2026",
    location: "Faisalabad, Punjab, Pakistan",
    focus: "Data Structures & Algorithms, Artificial Intelligence, Machine Learning, Database Systems, Computer Vision, Software Engineering"
  },
  {
    degree: "Intermediate in Computer Science (ICS)",
    institution: "Punjab Group Of Colleges",
    period: "August 2021 – September 2022",
    location: "Punjab, Pakistan",
    focus: "Mathematics, Computer Science, Statistics, Problem Solving Foundations"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "1 Million Prompters Initiative Certification",
    issuer: "Dubai Government & Dubai Future Foundation",
    year: "2024",
    highlight: "Comprehensive prompt engineering, generative AI reasoning, and LLM application design certified by Dubai Future Foundation."
  },
  {
    title: "AI/ML Certificate Internship",
    issuer: "USA Technology Partner",
    year: "2025",
    highlight: "Hands-on machine learning engineering covering production pipelines, model lifecycle, and automated testing."
  },
  {
    title: "Introduction to Programming Using Python",
    issuer: "Python Institute / Professional Academy",
    year: "2023",
    highlight: "Core data structures, object-oriented programming, algorithmic problem solving."
  },
  {
    title: "ChatGPT for Coders & Prompt Engineering",
    issuer: "AI Developer Academy",
    year: "2024",
    highlight: "Advanced code generation, automated test writing, and generative developer tooling."
  },
  {
    title: "Python Automation Project Certification",
    issuer: "Tech Skills Institute",
    year: "2024",
    highlight: "Scripting, web scraping, API orchestration, and automated OS task scheduling."
  },
  {
    title: "Artificial Intelligence Batch 01 Honors",
    issuer: "AI Excellence Cohort",
    year: "2024",
    highlight: "Intensive training in neural networks, mathematical foundations of ML, and computer vision."
  }
];

export const LANGUAGES = [
  { name: "English", proficiency: "Professional Working Proficiency" },
  { name: "Urdu", proficiency: "Native / Bilingual" },
  { name: "Punjabi", proficiency: "Native" }
];

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'rag' | 'nlp' | 'vision' | 'automation' | 'prompt' | 'finetuning';
  description: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  bestFor: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'rag-systems',
    title: 'Enterprise RAG & Semantic Knowledge Assistants',
    subtitle: 'Context-Aware AI Document Retrieval with Zero-Hallucination Guarantees',
    category: 'rag',
    description: 'Transform extensive internal PDFs, company wikis, manuals, and databases into conversational agents that quote exact page references with sub-second vector search.',
    deliverables: [
      'Hybrid Dense Vector + BM25 Lexical semantic indexing pipeline',
      'Chunking algorithms with metadata preservation (tables, markdown)',
      'Cross-encoder re-ranking for maximum top-K retrieval relevance',
      'Streaming FastAPI microservice with citation extraction & audit logs',
      'Evaluation notebook measuring groundedness, context precision, and recall'
    ],
    techStack: ['FastAPI', 'Hugging Face', 'ChromaDB', 'Pinecone', 'LangChain', 'Python'],
    timeline: '2 - 4 Weeks',
    bestFor: 'Companies with dense documentation, legal/compliance text, or customer support knowledge bases.'
  },
  {
    id: 'nlp-sentiment',
    title: 'Custom NLP & Sentiment Intelligence Engines',
    subtitle: 'Automated Sentiment Classification, Intent Routing & Polarity Analysis',
    category: 'nlp',
    description: 'High-throughput text analytics pipelines classifying customer reviews, incoming feedback, or social commentary into nuanced multi-class sentiment with confidence heatmaps.',
    deliverables: [
      'Text cleaning, lemmatization, token masking, and normalization pipeline',
      'Multi-class sentiment and intent classifier (Positive / Neutral / Negative / Urgent)',
      'Attention heatmap generator showing highest-impact polarity tokens',
      'Batch inference runner capable of processing 4,000+ sentences per minute',
      'Interactive metrics dashboard & REST API for live stream analysis'
    ],
    techStack: ['Python', 'FastAPI', 'PyTorch', 'Scikit-Learn', 'NLTK', 'Pandas'],
    timeline: '1 - 3 Weeks',
    bestFor: 'E-commerce brands, SaaS platforms, and customer experience teams needing real-time feedback triage.'
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision & Deep Learning Platforms',
    subtitle: 'CNN Model Training, Image Classification & Explainability Heatmaps',
    category: 'vision',
    description: 'End-to-end computer vision solutions from raw dataset preprocessing, image normalization, and data augmentation to custom convolutional backbones and Grad-CAM interpretability.',
    deliverables: [
      'Automated image augmentation and data loader pipeline',
      'Custom transfer learning architecture on ResNet / EfficientNet / ViT backbones',
      'Grad-CAM visualization module rendering feature activation heatmaps',
      'Class-wise confusion matrix, precision-recall analysis, and threshold calibration',
      'Lightweight Docker-containerized inference API (<35ms latency)'
    ],
    techStack: ['Python', 'PyTorch', 'OpenCV', 'NumPy', 'FastAPI', 'Docker'],
    timeline: '3 - 5 Weeks',
    bestFor: 'Quality assurance, product catalog categorization, visual defect detection, and medical/agricultural imaging.'
  },
  {
    id: 'ai-automation',
    title: 'AI Workflow Automation & Integration Pipelines',
    subtitle: 'Autonomous Background Agents, Webhook Listeners & Scheduled Jobs',
    category: 'automation',
    description: 'Connect internal CRM systems, webhooks, and email queues to automated Python workers that summarize data, run ML inference, and execute downstream workflows without human delay.',
    deliverables: [
      'Event-driven webhook listener endpoints with Pydantic payload verification',
      'Automated LLM summarization and structured JSON extraction agents',
      'Celery/Redis background task queues with exponential retry policies',
      'Database integration with PostgreSQL for immutable transaction logs',
      'Automated email/Slack notification hooks with alert triggers'
    ],
    techStack: ['Python', 'FastAPI', 'Celery', 'PostgreSQL', 'Docker', 'Webhooks'],
    timeline: '1 - 3 Weeks',
    bestFor: 'Startups and consulting firms wanting to automate 15+ hours/week of repetitive administrative data workflows.'
  },
  {
    id: 'prompt-engineering',
    title: 'Systematic Prompt Engineering & LLM Optimization',
    subtitle: 'Certified Dubai 1M Prompters Frameworks for Consistent Model Outputs',
    category: 'prompt',
    description: 'Eliminate flakiness and reduce token costs in production LLM workflows using structured reasoning scaffolds, few-shot calibration, and system invariant guardrails.',
    deliverables: [
      'Chain-of-thought (CoT) and structured schema prompt architecture',
      'Few-shot demonstration curation with adversarial edge-case testing',
      'Cost and latency reduction audit (trimming context tokens by 30-50%)',
      'Guardrail rules preventing jailbreaks, off-topic drift, and schema violation',
      'Automated evaluation test harness verifying output consistency'
    ],
    techStack: ['Prompt Engineering', 'Pydantic', 'OpenAI/Claude/Gemini APIs', 'JSON Schema', 'Python'],
    timeline: '1 - 2 Weeks',
    bestFor: 'Teams experiencing unpredictable LLM outputs, high OpenAI/cloud token bills, or schema parsing errors.'
  },
  {
    id: 'finetuning-ml',
    title: 'Transformer Fine-Tuning & Model Evaluation',
    subtitle: 'Hugging Face Model Adaptation for Domain-Specific Downstream Tasks',
    category: 'finetuning',
    description: 'Specialize open-source foundation models for proprietary industry jargon, specialized classification tags, or low-latency on-premise execution.',
    deliverables: [
      'Dataset curation, balancing, and synthetic data augmentation',
      'Parameter-Efficient Fine-Tuning (LoRA / QLoRA) on Hugging Face backbones',
      'Quantization (INT8 / INT4) and ONNX export for low-resource deployment',
      'Benchmark test suite measuring accuracy against base baseline models',
      'Deployment guide and standalone containerized inference server'
    ],
    techStack: ['Hugging Face', 'PyTorch', 'Transformers', 'PEFT / LoRA', 'ONNX', 'Linux'],
    timeline: '2 - 4 Weeks',
    bestFor: 'Enterprises needing private on-premise AI models without vendor lock-in or recurring API costs.'
  }
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'contracts' | 'technical' | 'workflow' | 'stack';
  categoryLabel: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-roles',
    question: 'What types of roles and contract engagements are you open to?',
    answer: 'I am actively open to full-time remote AI Engineer roles, long-term international consulting contracts, and milestone-based project engagements. Having worked remotely with US-based organizations (EmpowerTech Consulting LLC, micro1) and local technology firms (Nexoramind Tech), I am well-versed in asynchronous workflows, agile sprints, and remote collaboration.',
    category: 'contracts',
    categoryLabel: 'Roles & Contracts'
  },
  {
    id: 'faq-hallucination',
    question: 'How do you ensure RAG systems do not hallucinate false information?',
    answer: 'I apply a multi-layered verification strategy: (1) Hybrid retrieval combining dense vector embeddings with lexical BM25 search, (2) Cross-encoder re-ranking to filter out irrelevant chunks, (3) Strict system prompt guardrails instructing the model to rely strictly on provided contexts, and (4) Mandatory verbatim citation generation that matches answer claims directly to specific document pages and chunks.',
    category: 'technical',
    categoryLabel: 'Technical & Architecture'
  },
  {
    id: 'faq-timezone',
    question: 'What timezone are you located in and how do you handle international collaboration?',
    answer: 'I am based in Pakistan (PKT, UTC+5). I maintain high flexibility with guaranteed daily overlap for US East Coast (EST), US West Coast (PST), UK (GMT), and European (CET) business hours. Communication is streamlined via Slack, Discord, Zoom/Google Meet, and clear GitHub pull request documentation.',
    category: 'workflow',
    categoryLabel: 'Workflow & Collaboration'
  },
  {
    id: 'faq-lifecycle',
    question: 'What does your end-to-end development process look like?',
    answer: 'My process follows five defined phases: (1) Requirements & Data Discovery - identifying target metrics and constraints; (2) Data Preprocessing & Exploratory Analysis - cleaning, tokenizing, or normalizing datasets; (3) Prototyping & Baseline Modeling - fast iterations in Jupyter notebooks; (4) Backend Service Engineering - wrapping the model into production FastAPI endpoints with validation schemas; (5) Evaluation & Containerization - generating precision-recall metrics and Dockerizing for zero-friction deployment.',
    category: 'workflow',
    categoryLabel: 'Workflow & Collaboration'
  },
  {
    id: 'faq-proprietary-data',
    question: 'Can you train or fine-tune models on proprietary internal company data?',
    answer: 'Yes. All preprocessing and training pipelines can be executed inside your own private virtual private cloud (VPC), Docker containers, or air-gapped on-premise environments. No client data is ever transmitted to unauthorized external services or public model training queues.',
    category: 'technical',
    categoryLabel: 'Technical & Architecture'
  },
  {
    id: 'faq-stack-preference',
    question: 'Which programming languages, frameworks, and tools do you specialize in?',
    answer: 'My primary stack is Python-centric: FastAPI for high-performance async REST microservices, Hugging Face Transformers and PyTorch for deep learning and fine-tuning, ChromaDB/Pinecone for vector databases, Scikit-Learn and Pandas for classical ML & tabular data, OpenCV for vision, and Docker for containerized deployment.',
    category: 'stack',
    categoryLabel: 'Tech Stack & Tools'
  },
  {
    id: 'faq-prompters-initiative',
    question: 'What does the Dubai Government’s 1 Million Prompters certification entail?',
    answer: 'The Dubai Future Foundation’s 1 Million Prompters is a globally recognized program certifying expertise in systematic prompt architecture, chain-of-thought decomposition, few-shot calibration, and enterprise generative AI integration. It ensures that prompt engineering is treated as a deterministic software engineering discipline rather than guesswork.',
    category: 'contracts',
    categoryLabel: 'Roles & Contracts'
  },
  {
    id: 'faq-monitoring',
    question: 'Do you provide testing, benchmarking, and post-launch maintenance?',
    answer: 'Yes. Every project deliverable includes comprehensive test suites, latency profiling, and validation reports (accuracy, macro F1, confusion matrices). For ongoing engagements, I offer post-deployment monitoring, periodic model re-training on new data, and performance optimization.',
    category: 'workflow',
    categoryLabel: 'Workflow & Collaboration'
  }
];
