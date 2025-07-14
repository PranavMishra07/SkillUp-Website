import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Learner from './pages/Learner/LearnerDashboard';
import Home from './pages/Home';
import Navbar from './pages/components/Navbar';

import Courses from './pages/Courses';




// import Instructor from './pages/Instructor';
// import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthProvider';
import CourseDetail from './pages/CourseDetail';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import AddCourse from './pages/instructor/AddCourse';
import AdminDashboard from './pages/admin/AdminDashboard';
import Footer from './pages/components/Footer';

function App() {
  return (
    <AuthProvider>
      <Navbar/>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/' element={<Home/>}/>
        
          {/* <Route path="/login" element={<Auth.Login />} /> */}
          {/* <Route path="/dashboard/learner" element={<Learner.Dashboard />} /> */}
          {/* <Route path="/dashboard/instructor" element={<Instructor.Dashboard />} />
          <Route path="/dashboard/admin" element={<Admin.Dashboard />} /> */}
          {/* Add more routes as needed */}
          <Route path="/dashboard/learner" element={<Learner />} />

          <Route path='/courses' element = {<Courses/>}/>
          <Route path='/courses/:id' element = {<CourseDetail/>}/>
          <Route path='/dashboard/instructor' element = {<InstructorDashboard/>}/>
          <Route path='/instructor/add-course' element = {<AddCourse/>}/>
          <Route path='/dashboard/admin' element = {<AdminDashboard/>}/>
        </Routes>
        <Footer/>
    
    </AuthProvider>
  );
}

export default App;
