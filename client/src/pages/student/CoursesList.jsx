import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import CourseCard from '../../components/student/CourseCard'
import Footer from '../../components/student/Footer'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext)
  const { input } = useParams()
  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()
      input
        ? setFilteredCourse(
            tempCourses.filter(
              (item) =>
                item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses)
    }
  }, [allCourses, input])

  
  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500 py-2'>
              <span
                className='text-blue-600 cursor-pointer'
                onClick={() => navigate('/')}
              >
                Home
              </span>{' '}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600'>
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt='cross_icon'
              className='cursor-pointer'
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        {/* Show Courses or "Course Not Found" */}
        {filteredCourse.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
            {filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-center my-16'>
            <img
              src={assets.no_data} // Ensure you have a "no_data" image in assets
              alt='No courses found'
              className='w-80 h-52'
            />
            <h2 className='text-2xl font-semibold text-gray-700 mt-4'>
              No Courses Found
            </h2>
            <p className='text-gray-500'>
              Try searching for something else or explore other courses.
            </p>
            <button
              onClick={() => navigate('/course-list')}
              className='mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
            >
              View All Courses
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default CoursesList
