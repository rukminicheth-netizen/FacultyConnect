# FacultyConnect

A small web app for students to check whether a faculty member is **available** before walking all the way to their cabin.

In college, we often go to a faculty cabin and find they're in a class or busy. FacultyConnect shows each faculty member's cabin, working hours, current status and weekly schedule in one place.

Built solo, February 2026. BCA, CHRIST (Deemed to be University), Bengaluru.

## Features

- Dashboard with every faculty member's **department, floor, cabin, working hours and status**
- Status shown as **Available**, **Busy**, **Come after 30 minutes** or **Not available**
- **Weekly schedule** (Mon–Fri) for each faculty member, with this week's dates
- **Search** by name or department, plus a **department filter**
- Faculty can be **added**, and their **status** and **weekly schedule** can be updated
- Live date and time in the sidebar

## Tech used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Frontend:** HTML, CSS, JavaScript

## API

| Method | Route | What it does |
|---|---|---|
| GET | `/api/faculty` | Get all faculty |
| POST | `/api/register` | Add a new faculty member |
| POST | `/api/update` | Update a faculty member's status and working hours |
| POST | `/api/updateSchedule` | Update the weekly schedule |

## How to run

You need **Node.js** and **MongoDB** installed, with MongoDB running locally.

```bash
npm install
node server.js
```

Then open `http://localhost:3000`.

The app connects to a local MongoDB database called `facultyDB`. The list starts empty, so add faculty with the **Add Faculty** button.

## What I'd improve next

- A **faculty login**, so only faculty can update their own status (right now anyone can)
- Live updates without refreshing the page
- Hosting it online so students can use it from their phones
