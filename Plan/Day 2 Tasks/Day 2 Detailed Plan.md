# Day 2: Core Features & AI Integration - Detailed Plan

## Goal: Working creator discovery with AI search and automated outreach system.

### 1. Morning: Creator Discovery Engine & Gemini AI Integration

*   **1.1. Creator Discovery Engine Development**
    *   **1.1.1. Implement Creator Profile Pages:**
        *   Design and develop the UI for individual creator profile pages.
        *   Fetch creator data from Sanity CMS and display it on the profile pages.
        *   Ensure bilingual support (English/Hindi) for creator profiles.
    *   **1.1.2. Build Creator Search Functionality:**
        *   Integrate Sanity's built-in search for basic keyword searches.
        *   Develop UI components for filtering by category, language, and audience size.
        *   Implement logic to apply filters to search queries.
    *   **1.1.3. Create Creator Cards/Listings:**
        *   Design and develop reusable UI components for displaying creator information (e.g., cards in a grid or list view).
        *   Populate these components with sample creator data from Sanity.
    *   **1.1.4. Populate Sample Data:**
        *   Ensure a sufficient amount of realistic sample creator data is available in Sanity CMS for testing and demonstration.

*   **1.2. Gemini AI Integration for Creator Discovery**
    *   **1.2.1. Set up Gemini AI Service:**
        *   Verify `src/lib/ai/gemini.ts` is correctly configured and tested for basic API calls.
        *   Ensure API keys and environment variables are properly set.
    *   **1.2.2. Implement Prompt-Based Search:**
        *   Develop an API route or function to send user prompts to Gemini.
        *   Integrate Gemini's response to refine creator search results.
    *   **1.2.3. Develop Creator Matching Algorithm:**
        *   Utilize Gemini embeddings to enhance creator matching based on campaign requirements and creator profiles.
        *   Implement logic to rank and recommend creators based on AI insights.
    *   **1.2.4. Test AI Integration:**
        *   Thoroughly test Gemini-powered search and recommendation features with various prompts and data.

### 2. Afternoon: Campaign Management System & AI Outreach System

*   **2.1. Campaign Management System Development**
    *   **2.1.1. Create Campaign Creation Form:**
        *   Design and develop a user-friendly form for creating new campaigns.
        *   Integrate with Sanity CMS to store campaign details.
    *   **2.1.2. Build Campaign Dashboard:**
        *   Develop a dashboard to display a list of active and past campaigns.
        *   Implement basic campaign status tracking (e.g., "Draft", "Active", "Completed").
    *   **2.1.3. Implement Campaign Detail Pages:**
        *   Create pages to view detailed information for individual campaigns.
        *   Allow for creator selection and association with campaigns.

*   **2.2. AI Outreach System Development**
    *   **2.2.1. Develop Email Templates:**
        *   Create a set of customizable email templates for outreach (English & Hindi).
        *   Store templates in Sanity CMS for easy management.
    *   **2.2.2. Integrate Google Translate for Outreach:**
        *   Verify `src/lib/ai/translate.ts` is correctly configured and tested.
        *   Implement logic to translate outreach messages based on creator language preference.
    *   **2.2.3. Implement Gemini Personalization:**
        *   Utilize Gemini to personalize outreach messages based on campaign details and creator profiles.
        *   Develop basic negotiation capabilities (simulated or basic automated responses).
    *   **2.2.4. Design Automation Workflow:**
        *   Outline and implement the automated email outreach flow.
        *   Integrate with Sanity for CRM-style communication logging.

### 3. Evening: Language Implementation

*   **3.1. Next.js i18n Routing Setup:**
    *   Configure Next.js for internationalization (i18n) routing to support English and Hindi.
    *   Define locales and default language.
*   **3.2. Language Context/Hooks Implementation:**
    *   Create React Context or custom hooks for managing and accessing the current language preference throughout the application.
*   **3.3. Switching Functionality:**
    *   Develop UI components (e.g., a language switcher) to allow users to change the application language.
    *   Implement logic to persist language preference (e.g., using cookies or local storage).
*   **3.4. Testing Bilingual Content:**
    *   Thoroughly test all UI components and content for proper rendering in both English and Hindi.
    *   Verify that language switching works seamlessly across the application.

### Architecture Diagram (Focus on Day 2 components)

```mermaid
graph TD
    A[Frontend - Next.js] --> B(Creator Discovery UI)
    A --> C(Campaign Management UI)
    A --> D(AI Outreach UI)
    A --> E(Language Switcher)

    B --> F(Sanity CMS - Creator Data)
    B --> G(Google Gemini - Search/Recommendations)

    C --> H(Sanity CMS - Campaign Data)

    D --> I(Sanity CMS - Communication Logs)
    D --> J(Google Gemini - Personalization)
    D --> K(Google Translate - Outreach)

    E --> L(Next.js i18n)

    F --> B
    G --> B
    H --> C
    I --> D
    J --> D
    K --> D
    L --> A