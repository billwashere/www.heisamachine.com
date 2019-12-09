import React from 'react';
import { render } from 'react-snapshot'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import {moveCamera, moveCameraAngle} from './actions'
import App from './App';
import './index.scss';

const enable_logger = false;

const logger = store => next => action => {
  if(enable_logger) {
    console.group(action.type)
    console.info('dispatching', action)
  }
  let result = next(action)
  if(enable_logger) {
    console.log('next state', store.getState())
    console.groupEnd()
  }
  return result
}

const moveCameraMiddleWare = store => next => action => {
  
  if(action.type === 'MOVE_CAMERA') {
    document.documentElement.style.setProperty("--cameraZ", window.pageYOffset);
  }
  let result = next(action)
  
  return result
}

const moveCameraAngleMiddleWare = () => next => action => {
  
  if(action.type ===  'MOVE_CAMERA_ANGLE') {
    const xGap =
    (((action.event.clientX - window.innerWidth / 2) * 100) /
      (window.innerWidth / 2)) *
    -1;
  const yGap =
    (((action.event.clientY - window.innerHeight / 2) * 100) /
      (window.innerHeight / 2)) *
    -1;
  const newPerspectiveOriginX =
    perspectiveOrigin.x + (xGap * perspectiveOrigin.maxGap) / 100;
  const newPerspectiveOriginY =
    perspectiveOrigin.y + (yGap * perspectiveOrigin.maxGap) / 100;

  document.documentElement.style.setProperty(
    "--scenePerspectiveOriginX",
    newPerspectiveOriginX
  );
  document.documentElement.style.setProperty(
    "--scenePerspectiveOriginY",
    newPerspectiveOriginY
  );
  }
  let result = next(action)
  
  return result
}


const store = createStore(rootReducer,applyMiddleware(logger,moveCameraMiddleWare,moveCameraAngleMiddleWare))

const perspectiveOrigin = {
  x: parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--scenePerspectiveOriginX"
    )
  ),
  y: parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--scenePerspectiveOriginY"
    )
  ),
  maxGap: 10
};

const s = [{title:"SKILLS - Databases",content:["Microsoft SQL Server", "MySQL",  "Sybase ASE", "PostgreSQL"]},{title:"SKILLS - Programming Languages ", content:["HTML", "Java", "Javascript", "SQL"]},
{title:"EXPERIENCE - GBST Holdings PTY Ltd, Wollongong - Business Intelligence Reporting Analyst 2017 - Present",content:[`					

Design and implement a bespoke Resource Management using SQL Server,Excel,and VBA macros
Communicate and advise Upper and Middle Management
Analyse project data
Design and implement a Datamart 
Writing Reports using SSRS and Power Bi (eg Product Profitability, Utilisation)`
]},{
title:"EXPERIENCE - GBST Holdings PTY Ltd, Wollongong - Software Release Engineer 2014 - 2017",
content:[
`Maintaining and enhancing tools written in Batch/PowerShell, Java and SQL (compatible with Microsoft SQL Server, Sybase ASE, and PostgreSQL) which are deployed to clients as well as used internally. `,
`Ensuring the integrity for all Wealth Management software source code.`,
`Packaging software for major Australian, and UK banking institutions.`,
`Maintaining a client download portal written in PHP and MySQL`



]},{
  title:"EXPERIENCE - Itree Pty Ltd, Wollongong - Software Engineer 2013 - 2014",
  content:[`Write ETL transformations in SSIS Maritime New Zealand and  Australian Maritime Safety Authority.`, 
`Fixing application data using T-SQL and Java.`]},{
  title:"EXPERIENCE - Top Video Coledale, Coledale - Retail Assistant 2011 - 2015",
  content:[`The assisting of customers with enquires and handling of money at the cash register.`, 
`Administrative tasks such as adding new and modifying existing inventory items.`] }, {
title:"EXPERIENCE - Big W, Dapto  - Recovery Associate 2008 - 2010",
content:[`The assisting of customers with enquires`, 
`Restocking and cleaning shelves`]},{title:"CERTIFICATION - AXELOS - PRINCE2 Agile® Practitioner 2019",content:[`
This certificate combines the flexibility and responsiveness of agile with PRINCE2 Project management solution.`]}
,{title:"EDUCATION",content:[`
University of Wollongong, Wollongong - Bachelor of Computer Science
2011-2013`]}
]


render(
  <Provider store={store}>
    <App cards={s} />
  </Provider>,
  document.getElementById('root')
);

document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOMContentLoaded after ReactDOM.render');
  window.addEventListener("scroll", () => { store.dispatch(moveCamera());  });
  window.addEventListener("mousemove",(e) => { store.dispatch(moveCameraAngle(e));  });
  setSceneHeight();
});

function setSceneHeight() {
  const numberOfItems = s.length; // Or number of items you have in `.scene3D`
  const itemZ = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--itemZ")
  );
  const scenePerspective = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--scenePerspective"
    )
  );
  const cameraSpeed = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--cameraSpeed")
  );

  const height =
    window.innerHeight +
    scenePerspective * cameraSpeed +
    itemZ * cameraSpeed * numberOfItems;

  // Update --viewportHeight value
  document.documentElement.style.setProperty("--viewportHeight", height);
}

