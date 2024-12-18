import { useEffect, useState, useContext } from "react";
import "./dashboard.scss";
import days from "./days";
import lessons from "./lessons";
import subjects from "./subjects";
import Select from "react-select";
import { AppContext } from "../../context/app.context";
import { Link } from "react-router-dom";
import Papa from "papaparse";

const Dashboard = () => {
  const [logged, setLogged] = useState(false);
  const { plan, setPlan } = useContext(AppContext);
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleFileUpload = () => {
    // Przykładowy plik CSV, żebyś Bartek przetestował jak to działa jest w katalogu 'public' pod nazwą: 'Plan_lekcji_2a.csv' :)
    if (!csvFile) {
      alert("Plik jest nie poprawny, lub nie został importowany");
      return;
    } else {
      alert("Plik zaimportowany poprawnie");
    }

    Papa.parse(csvFile, {
      complete: (result) => {
        const data = result.data;
        const newPlan = {};

        days.forEach((day) => {
          newPlan[day.toLowerCase()] = {};
          lessons.forEach((lesson) => {
            newPlan[day.toLowerCase()][lesson] = null;
          });
        });

        data.forEach((row) => {
          const [day, lesson, subject] = row;

          const validatedDay = day ? day.trim() : null;
          const validatedLesson = lesson ? lesson.trim() : null;
          const validatedSubject = subject ? subject.trim() : null;

          if (validatedDay && validatedLesson && validatedSubject) {
            newPlan[validatedDay.toLowerCase()][validatedLesson] =
              validatedSubject;
          }
        });

        setPlan(newPlan);
      },
      header: false,
    });
  };
  const logout = () => {
    window.sessionStorage.clear();
    setLogged(false);
  };

  const selectHandle = (subject, day, lesson) => {
    const planCopy = { ...plan };
    planCopy[day.toLowerCase()][lesson] = subject ? subject.label : "";
    setPlan(planCopy);
  };

  useEffect(() => {
    const isLogged = window.sessionStorage.getItem("logged");

    if (!isLogged) {
      window.location.href = "/admin";
      return;
    }

    setLogged(true);
  }, [logged]);

  const localStoragePlan = () => {
    window.localStorage.setItem("plan", JSON.stringify(plan));
  };

  return (
    <div className="app-dashboard-container">
      <div className="buttons">
        <button onClick={logout}>Wyloguj</button>
        <Link to="/">
          <button className="save" onClick={localStoragePlan}>
            Zapisz
          </button>
        </Link>
      </div>

      <h2>Dashboard</h2>
      <div className="file-upload">
        <label htmlFor="file-upload" className="visually-hidden"></label>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />

        <button onClick={handleFileUpload}>Załaduj plan lekcji</button>
      </div>
      <div className="container">
        <div className="table">
          {days.map((day) => (
            <div key={day} className="column">
              <div className="day">{day}</div>
              {lessons.map((lesson) => (
                <div key={lesson} className="row">
                  <div className="lesson">{lesson}</div>
                  <div className="subject">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable={true}
                      isClearable={true}
                      name="subject"
                      options={subjects}
                      value={
                        plan[day.toLowerCase()] &&
                        plan[day.toLowerCase()][lesson]
                          ? {
                              label: plan[day.toLowerCase()][lesson],
                              value: plan[day.toLowerCase()][lesson],
                            }
                          : null
                      }
                      onChange={(subject) => selectHandle(subject, day, lesson)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
