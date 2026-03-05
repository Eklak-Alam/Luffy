export const devopsProjects = {
  "vortex-cicd": {
    id: "vortex-cicd",
    slug: "vortex-fullstack-devops-pipeline",
    // TITLE IS NOW SHORT AND PUNCHY
    title: "Vortex CI/CD",
    // ADDED TAGLINE FOR CONTEXT
    tagline: "Zero-Downtime Full-Stack Delivery",
    image: "/projectImg/devopcloud/vortex-cicd.png",
    shortDescription: "A production-grade architecture orchestrated via Docker and Nginx, featuring a fully automated CI/CD pipeline powered by Jenkins on AWS EC2.",
    fullDescription: "Moving a full-stack application from 'localhost' to a live production server is often where development stops and engineering begins. I built Vortex not just as a web app, but as a complete demonstration of a modern DevOps lifecycle. The core application consists of a high-performance Next.js 14 frontend and a robust Java Spring Boot backend, but the real engineering challenge was orchestrating these services in a secure, automated cloud environment.\n\nI tackled the classic 'works on my machine' problem by containerizing the entire stack using Docker and Docker Compose. To bridge the gap between development and production, I engineered a custom CI/CD pipeline using Jenkins hosted on an AWS EC2 instance. This pipeline automatically detects code changes via GitHub Webhooks, builds the Docker images, injects dynamic environment variables (like the server's public IP) during the build process, and deploys the new version without manual intervention.\n\nA major hurdle was managing networking and security. Exposing raw ports like 3000 and 8081 is insecure and unprofessional. I solved this by implementing Nginx as a Reverse Proxy. Nginx sits at the edge (Port 80), routing traffic internally to the correct containers while handling CORS and headers. This setup allows for a clean, production-ready URL structure while keeping the backend logic isolated from the public internet.",
    tools: [
      "Next.js 14",
      "Java Spring Boot 3",
      "Docker & Compose",
      "Jenkins",
      "Nginx",
      "AWS EC2",
      "MySQL",
      "Groovy"
    ],
    steps: [
      "Developed a decoupled full-stack architecture with a Next.js frontend and Spring Boot REST API.",
      "Containerized all services using optimized multi-stage Dockerfiles.",
      "Provisioned an AWS EC2 instance and configured a Jenkins server as the automation hub.",
      "Wrote a Groovy-based Jenkinsfile that auto-detects and injects the server IP during build.",
      "Implemented Nginx as a reverse proxy to unify the frontend and backend under a secure port (80).",
      "Configured GitHub Webhooks to trigger the pipeline automatically on push to the main branch."
    ],
    links: {
      github: "https://github.com/Eklak-Alam/vortex-cicd",
      live: "#"
    }
  },

  "chat-docker-deploy": {
    id: "chat-docker-deploy",
    slug: "dockerized-realtime-chat-deployment",
    title: "3-Tier Containerization",
    tagline: "Stateful Real-Time Infrastructure",
    image: "/projectImg/devopcloud/chat-docker-deploy.png",
    shortDescription: "End-to-end containerization and AWS deployment of a real-time WebSocket architecture featuring secure, isolated internal networking.",
    fullDescription: "Deploying stateful, real-time applications presents a unique set of challenges compared to standard stateless REST APIs. This project involved the complete containerization and cloud deployment of a complex 3-tier chat application comprising a Next.js frontend, a Node.js/Express backend utilizing Socket.io for bidirectional communication, and a MySQL database for persistent message storage. The primary objective was to solve the classic 'it works on my machine' dilemma by creating an immutable, portable infrastructure that runs identically in development and production environments.\n\nMy approach began with architectural decoupling. I wrote custom multi-stage Dockerfiles for both the frontend and backend services. For the Node.js backend, I utilized Alpine-based images to minimize the attack surface and reduce the final image size, ensuring faster pull times on the server. The most critical technical challenge was orchestrating the internal networking between these containers. Unlike a monolithic setup, the frontend container needed to communicate with the backend API via client-side requests, while the backend needed a secure, private channel to talk to the MySQL database container. I utilized Docker Compose to define a custom bridge network, isolating the database from the public internet while allowing the backend service to access it via service discovery hostnames.\n\nFor the deployment infrastructure, I provisioned a raw AWS EC2 instance (Ubuntu). Instead of using managed services like RDS or Vercel, I opted for a self-managed approach to demonstrate deep Linux and Docker competency. I hardened the server, installed the Docker runtime, and deployed the entire stack using docker-compose up. This single-command deployment strategy automated the provisioning of volumes for database persistence, environment variable injection, and port mapping.",
    tools: [
      "AWS EC2",
      "Docker",
      "Docker Compose",
      "Socket.io",
      "MySQL",
      "Next.js",
      "Node.js",
      "Linux CLI"
    ],
    steps: [
      "Developed custom Dockerfiles for the Next.js frontend and Node.js WebSocket backend.",
      "Configured a custom bridge network in Docker Compose for secure API-to-Database communication.",
      "Built and pushed multi-architecture images to a public Docker Hub repository.",
      "Provisioned and hardened an AWS EC2 instance with Git and Docker Engine.",
      "Executed single-command cloud deployment utilizing volume mounting for database persistence."
    ],
    links: {
      github: "https://github.com/Eklak-Alam/chat-docker",
      live: "#"
    }
  },

  "todo-github-actions": {
    id: "todo-github-actions",
    slug: "automated-cicd-pipeline-github-actions",
    title: "GitOps Deployment",
    tagline: "Click-less AWS EC2 Pipeline",
    image: "/projectImg/devopcloud/todo-github-actions.png",
    shortDescription: "A comprehensive Continuous Integration and Deployment workflow utilizing GitHub Actions to automate testing, building, and live server updates.",
    fullDescription: "In modern software engineering, manual deployments are a bottleneck and a major source of production errors. For this project, I engineered a comprehensive Continuous Integration/Continuous Deployment (CI/CD) pipeline for a 3-tier Todo application (Next.js, Node.js, MySQL) to achieve a 'Click-less Deployment' workflow. The goal was to ensure that every code merge to the main branch would automatically trigger a sequence of quality checks, builds, and updates to the live AWS EC2 server without any human intervention.\n\nI leveraged GitHub Actions as the orchestration engine. The pipeline is divided into two distinct stages: Integration and Deployment. The Integration stage runs immediately upon code push, executing linting and unit tests to ensure code quality. Once the tests pass, the pipeline builds optimized Docker images for the frontend and backend services and pushes them to the Docker Hub registry. I implemented semantic tagging strategies to keep track of build versions (latest vs. specific commit SHA).\n\nThe Deployment stage involved complex security configurations. I utilized GitHub Secrets to encrypted sensitive credentials, such as Docker Hub access tokens, AWS SSH keys, and host IP addresses. The pipeline uses an appleboy/ssh-action to securely tunnel into the EC2 instance. It then executes a script to pull the newly built images from the registry and performs a rolling restart of the services using Docker Compose. This automated approach reduced the deployment time from 15 minutes of manual work to under 2 minutes.",
    tools: [
      "GitHub Actions",
      "AWS EC2",
      "Docker Hub",
      "SSH / SCP",
      "GitHub Secrets",
      "Linux",
      "YAML"
    ],
    steps: [
      "Designed a GitHub Actions YAML workflow to trigger automatically on main branch pushes.",
      "Integrated Docker Hub credentials into GitHub Secrets for secure artifact pushing.",
      "Configured secure SSH tunneling within the workflow to execute commands on the remote AWS server.",
      "Scripted deployment logic to pull the latest images and restart services with zero downtime.",
      "Validated the pipeline to reduce manual deployment time from 15 minutes to under 2 minutes."
    ],
    links: {
      github: "https://github.com/Eklak-Alam/todo-actions",
      live: "#"
    }
  },

  "todo-jenkins-cicd": {
    id: "todo-jenkins-cicd",
    slug: "enterprise-jenkins-cicd-monitoring",
    title: "Enterprise Jenkins",
    tagline: "Self-Hosted Build Server & Monitoring",
    image: "/projectImg/devopcloud/todo-jenkins-cicd.png",
    shortDescription: "Provisioning and managing a self-hosted Jenkins infrastructure on AWS with automated SMTP email alerting and GitHub Webhook triggers.",
    fullDescription: "While cloud-native CI tools are popular, Jenkins remains the industry standard for enterprise-grade, highly customizable automation. This project involved provisioning and managing a self-hosted Jenkins infrastructure on AWS EC2 to orchestrate the lifecycle of a full-stack application. Unlike managed services where the environment is abstract, I had to manually configure the build server, install the Java runtime, manage plugins, and secure the instance using AWS Security Groups to allow traffic only on port 8080.\n\nI adopted the 'Pipeline as Code' philosophy by writing a declarative Jenkinsfile stored in the root of the project repository. This file defines the entire build pipeline in stages: Checkout, Build, Test, Push, and Deploy. I configured GitHub Webhooks to create an event-driven architecture; whenever a developer pushes code, GitHub sends a payload to the Jenkins server, instantly triggering the build process. The pipeline handles Docker image creation and pushes artifacts to a private registry.\n\nA key focus of this project was Observability and Feedback. In a professional setting, developers need immediate feedback if a build fails. I integrated the Jenkins pipeline with an SMTP server (using Gmail relay) to send automated email notifications. If a build passes, the team is notified of a successful deployment; if it fails (e.g., due to a failed test or Docker build error), the email includes the build logs for rapid debugging.",
    tools: [
      "Jenkins",
      "AWS EC2",
      "Groovy",
      "Docker",
      "GitHub Webhooks",
      "SMTP Setup",
      "Linux Server Admin"
    ],
    steps: [
      "Provisioned an EC2 instance, installed Java/Docker, and configured AWS Security Groups for port 8080.",
      "Wrote a declarative Jenkinsfile to programmatically define build, test, and deploy stages.",
      "Configured GitHub Webhooks for event-driven build triggers upon code commits.",
      "Implemented secure credential management within Jenkins for Docker Hub and AWS access.",
      "Engineered an SMTP 'Post-Build Action' to automatically email logs to the team upon pipeline failure."
    ],
    links: {
      github: "https://github.com/Eklak-Alam/jenkins-pipeline",
      live: "#"
    }
  },

  "terraform-repo-auto": {
    id: "terraform-repo-auto",
    slug: "iac-terraform-github-automation",
    title: "Terraform IaC",
    tagline: "Infrastructure as Code Workflows",
    image: "/projectImg/devopcloud/terraform-repo-auto.png",
    shortDescription: "Automating 'Day 0' developer environments by programmatically provisioning GitHub repositories and pushing boilerplate code via HashiCorp HCL.",
    fullDescription: "Infrastructure as Code (IaC) is typically associated with provisioning servers, but its principles apply equally well to Developer Experience (DevEx) and workflow automation. I developed this Terraform project to solve the repetitive, error-prone process of 'Day 0' project setup. Manually creating a GitHub repository, setting visibility, initializing a local Git folder, creating boilerplate HTML/CSS/JS files, and linking the remote origin is a tedious process that breaks developer flow. I automated this entire sequence using Terraform and the GitHub Provider.\n\nThe project uses HashiCorp Configuration Language (HCL) to define the desired state of a GitHub repository. I utilized sensitive input variables to securely handle Personal Access Tokens (PAT) for authentication with the GitHub API. Beyond just creating the repository, I leveraged Terraform's local-exec provisioners to bridge the gap between cloud API calls and local machine operations. These provisioners execute local Bash commands to initialize Git, generate the starter code files, stage them, commit them, and push them to the newly created remote origin.\n\nThis project serves as a powerful demonstration of how IaC tools can be used to standardize engineering practices. By running a single command—terraform apply—I can provision a fully configured project environment in seconds. This ensures consistency across projects, enforcing standard naming conventions and repository settings programmatically.",
    tools: [
      "Terraform",
      "HCL",
      "GitHub API",
      "Git CLI",
      "Bash Scripting"
    ],
    steps: [
      "Configured the Terraform GitHub Provider with secure Personal Access Token (PAT) management.",
      "Wrote HCL state files to define repository parameters (naming, description, privacy).",
      "Implemented local-exec provisioners to execute Bash commands directly from Terraform.",
      "Automated the local initialization of Git and generation of boilerplate project files.",
      "Chained commands to automatically stage, commit, and push code to the new remote origin in one step."
    ],
    links: {
      github: "https://github.com/Eklak-Alam/terraform-automation",
      live: "#"
    }
  }
};

export const allDevOpsProjects = Object.values(devopsProjects);