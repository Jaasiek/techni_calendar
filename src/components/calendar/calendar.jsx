import "./calendar.scss";
import Select from "react-select";
import { useState } from "react";
import subjects from "../../views/dashboard/subjects";

const Calendar = ({ plan: initialPlan = {} }) => {
  const [plan, setPlan] = useState(initialPlan);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjectNormalization = (subject) => subject?.replace(/^! */, "").trim();

  const subjectChange = (subject) => {
    setSelectedSubject(subject ? subject.label.trim() : null);
  };

  const lessonClick = (day, lesson) => {
    setPlan((prevPlan) => {
      const dayLessons = prevPlan[day] || {};
      const currentLesson = dayLessons[lesson] || "";
      const updatedLesson = currentLesson.startsWith("!")
        ? currentLesson.slice(1).trim()
        : `! ${currentLesson.trim()}`;

      return {
        ...prevPlan,
        [day]: {
          ...dayLessons,
          [lesson]: updatedLesson,
        },
      };
    });
  };

  return (
    <div className="app-calendar-container">
      <h2>Calendar</h2>
      <Select
        className="subject-select"
        classNamePrefix="select"
        isSearchable={true}
        isClearable={true}
        name="subject"
        options={subjects}
        onChange={subjectChange}
      />
      <div className="table">
        {Object.keys(plan).map((day) => (
          <div key={day} className="column">
            <p className="day">{day}</p>
            {Object.keys(plan[day] || {}).map((lesson) => (
              <div
                key={lesson}
                className={`lesson ${
                  selectedSubject &&
                  subjectNormalization(plan[day][lesson]) ===
                    subjectNormalization(selectedSubject)
                    ? "highlight"
                    : ""
                }`}
                onClick={() => lessonClick(day, lesson)}
              >
                <p className="lessonNo">{lesson}.</p>
                <p
                  className="subject"
                  data-has-exclamation={
                    plan[day][lesson]?.startsWith("!") ? "true" : "false"
                  }
                >
                  {subjectNormalization(plan[day][lesson]) || ""}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
