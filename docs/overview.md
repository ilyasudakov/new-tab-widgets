## Project overview

This project will allow user to add widgets for their customizable home page in low-poly-dither style.

The goal is to give a quick overview of upcoming/current activities.

## Rules

- Make sure to update this document along the development process and mark what was already implemented and what we need to do next.

## 1. Integrations list

Create a separate page 'IntegrationsList', that will have a list of all integrations that we'll implement (e.g., Google Calendar, Gmail, etc.). User will be able to authorize the corresponding accoount to be able to add integration to the main page.

### 1.1 Planned Integrations

1. Google Calendar

   - Display upcoming events for today
   - Show week overview
   - Quick add event functionality
   - Color coding for different calendars

2. Gmail (Future)

   - Unread email count
   - Preview of latest important emails
   - Quick compose functionality

3. Weather (Future)

   - Current weather conditions
   - Daily forecast
   - Weather alerts

4. Tasks/Todo (Future)
   - Integration with Google Tasks
   - Quick add task
   - Due date tracking

## 2. Implementation Plan

### Phase 1: Google Calendar Integration

1. Setup & Authentication

   - Create Google Cloud Project
   - Set up OAuth 2.0 credentials
   - Implement secure token storage
   - Add authentication flow

2. Calendar Widget Development

   - Create base widget component structure
   - Implement Google Calendar API calls
   - Design low-poly-dither style calendar view
   - Add today's events list view
   - Implement week overview
   - Add event creation modal
