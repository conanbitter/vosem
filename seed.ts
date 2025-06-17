import { db } from "./src/db/db";
import { tasksTable, usersTable } from "./src/db/schema";

/*
await db.insert(usersTable).values([
    {
        login: "admin",
        password: await Bun.password.hash(process.env.USR_ADMIN_PASS!),
        name: "Administrator",
        registered: new Date(),
        role: "admin"
    },
    {
        login: "user1",
        password: await Bun.password.hash(process.env.USR_USER1_PASS!),
        name: "Test User",
        registered: new Date(),
        role: "user"
    },
]);
*/

const tasks = [
    { title: "Project Initialization", desc: "Set up initial documentation, define scope, and assign team roles." },
    { title: "Requirement Gathering", desc: "Conduct meetings with stakeholders to collect functional and non-functional requirements." },
    { title: "Technical Feasibility Study", desc: "Analyze technical aspects and constraints of the proposed solution." },
    { title: "Architecture Design", desc: "Draft system architecture, including infrastructure, databases, and services." },
    { title: "UI/UX Wireframing", desc: "Create wireframes and mockups to visualize user interface and user experience." },
    { title: "Database Schema Design", desc: "Define tables, relationships, and data models based on project needs." },
    { title: "API Specification", desc: "Document endpoints, request/response formats, and authentication methods." },
    { title: "Environment Setup", desc: "Configure development, staging, and production environments." },
    { title: "Frontend Development", desc: "Implement user-facing components and features based on designs." },
    { title: "Backend Development", desc: "Build core business logic, database integration, and APIs." },
    { title: "Integration Testing", desc: "Test interactions between modules and services to ensure cohesive behavior." },
    { title: "Performance Optimization", desc: "Tune system for scalability, load handling, and speed." },
    { title: "Security Review", desc: "Perform vulnerability assessments and implement necessary protections." },
    { title: "User Acceptance Testing (UAT)", desc: "Collaborate with users to validate functionality and usability." },
    { title: "Bug Fixing and QA", desc: "Address reported issues, conduct regression testing, and ensure quality." },
    { title: "Deployment Planning", desc: "Define steps for releasing software to production with rollback options." },
    { title: "Release Management", desc: "Coordinate versioning, release notes, and deployment execution." },
    { title: "Monitoring and Logging Setup", desc: "Implement tools for system monitoring, alerting, and diagnostics." },
    { title: "Documentation Finalization", desc: "Complete user manuals, API docs, and developer guides." },
    { title: "Project Retrospective", desc: "Review project outcomes, lessons learned, and improvement areas." },
    { title: "Stakeholder Alignment Meetings", desc: "Regular sessions to align expectations and gather feedback." },
    { title: "Risk Assessment", desc: "Identify, evaluate, and prioritize project risks with mitigation strategies." },
    { title: "Code Review Process", desc: "Establish and enforce peer review practices for code quality." },
    { title: "DevOps Pipeline Setup", desc: "Configure CI/CD pipelines for automated testing and deployment." },
    { title: "Version Control Strategy", desc: "Define branching, merging, and tagging conventions in source control." },
    { title: "Third-Party Integration", desc: "Connect and configure external services like payment gateways or analytics." },
    { title: "Mobile Responsiveness Testing", desc: "Ensure UI functions well across various screen sizes and devices." },
    { title: "Data Migration Planning", desc: "Strategize and execute data transfers from legacy systems." },
    { title: "Feature Flag Management", desc: "Implement toggles for enabling/disabling features in production." },
    { title: "Accessibility Compliance Review", desc: "Validate that the product meets accessibility standards (e.g., WCAG)." },
    { title: "Error Handling Implementation", desc: "Design consistent error management and user feedback mechanisms." },
    { title: "Load Testing", desc: "Simulate user load to test system behavior under pressure." },
    { title: "Customer Support Preparation", desc: "Equip support teams with knowledge bases and response scripts." },
    { title: "Analytics Integration", desc: "Add tools for tracking usage, events, and performance metrics." },
    { title: "Legal & Compliance Review", desc: "Verify that the solution complies with relevant regulations (e.g., GDPR)." },
    { title: "Internal Training Sessions", desc: "Conduct training for internal stakeholders and new users." },
    { title: "Incident Response Planning", desc: "Establish workflows for identifying and managing production issues." },
    { title: "Branding and Theming", desc: "Apply consistent visual identity across the application." },
    { title: "Content Population", desc: "Enter placeholder or real content into the system for final testing." },
    { title: "Go-Live Checklist Completion", desc: "Final validation of all pre-launch criteria and readiness checks." },
];

const taskData = tasks.map(({ title, desc }) => ({ title, description: desc }));

for (const task of tasks) {
    await db.insert(tasksTable).values({
        title: task.title,
        description: task.desc,
        state: 'active',
        created: new Date(),
        updated: new Date(),
        author: 1
    });
}