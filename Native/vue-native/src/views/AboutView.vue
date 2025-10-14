<template>
  <div
    class="s-education-home"
    data-plr-component="s-education-home"
    id="education"
  >
    <div class="s__inner">
      <div class="u-container">
        <div class="s__content js-content">
          <h2 class="s__suptitle t-suptitle">Education</h2>

          <p class="s__title t-title">We help artists grow</p>

          <p class="s__text rte">
            Access expert-led
            <a href="https://learn.247artists.com/">online courses</a>, live
            webinars, and mentorship programs designed to sharpen your skills
            and expand your career opportunities.
          </p>

          <div class="s__background"></div>
        </div>
        <!-- .s__content -->
      </div>
      <!-- .u-container -->

      <div class="s__courses">
        <h3 class="sb-course sb-course--title js-course">
          <span class="sb__inner"> 20+ Courses </span
          ><!-- .sb__inner -->
        </h3>

        <ul class="s__courses__list">
          <li class="sb-course js-course">
            <span class="sb__inner"> Creating a One Year Indie Music Plan </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner">
              Building an Unstoppable Brand Identity </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> The art of Vision Boarding </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> 5 Tips for Artists Going On Tour </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Music Business Intro </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner">
              How to Manage Yourself as an Artist on the Road </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Marketing for Artists </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Building a team </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Artist Career Path </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Music Publishing 101 </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner">
              Writing your Business Plan (Business model canvas) </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Music Releasing Strategies </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Music Marketing and Promotion </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Tour Management and Booking </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Artist Development Strategies </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Copyright and Intellectual Property </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Starting an indie record label </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Agreements and Contracts 101 </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Intro to Artist Management </span
            ><!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Setting up YOUR business </span
            ><!-- .sb__inner -->
          </li>
        </ul>
        <!-- .s__courses__list -->
      </div>
      <!-- .s__courses -->
    </div>
    <!-- .s__inner -->
  </div>
  <!-- .s-education-home -->
</template>

<style scoped>
/* 从源码中提取的教育部分样式 */
.s-education-home {
  position: relative;
  overflow: hidden;
}

.s-education-home .s__inner {
  position: relative;
  z-index: 1;
}

.u-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
}

.s-education-home .s__content {
  position: relative;
  padding: 120px 0 80px;
  text-align: center;
}

.t-suptitle {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: block;
}

.t-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 30px;
}

.s-education-home .s__text {
  font-size: 18px;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.s-education-home .s__text a {
  color: inherit;
  text-decoration: underline;
}

.s-education-home .s__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  z-index: -1;
}

.s-education-home .s__courses {
  padding: 60px 0 120px;
}

.sb-course--title {
  text-align: center;
  margin-bottom: 50px;
}

.sb-course--title .sb__inner {
  font-size: 32px;
  font-weight: 700;
  color: #2a2925;
}

.s-education-home .s__courses__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  list-style: none;
  padding: 0;
}

.sb-course {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.sb-course:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.sb-course .sb__inner {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  color: #2a2925;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .u-container {
    padding: 0 20px;
  }

  .s-education-home .s__content {
    padding: 80px 0 60px;
  }

  .t-title {
    font-size: 36px;
  }

  .s-education-home .s__text {
    font-size: 16px;
  }

  .s-education-home .s__courses {
    padding: 40px 0 80px;
  }

  .s-education-home .s__courses__list {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .sb-course--title .sb__inner {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .t-title {
    font-size: 28px;
  }

  .sb-course {
    padding: 20px;
  }

  .sb-course .sb__inner {
    font-size: 14px;
  }
}
</style>

<script>
export default {
  name: "EducationSection",
  mounted() {
    // 可以在这里添加交互逻辑
    this.initCourseInteractions();
  },
  methods: {
    initCourseInteractions() {
      // 课程项交互逻辑
      const courses = document.querySelectorAll(".sb-course.js-course");
      courses.forEach((course) => {
        course.addEventListener("click", () => {
          // 处理课程点击事件
          const courseTitle = course.querySelector(".sb__inner").textContent;
          console.log("Course selected:", courseTitle);
          // 这里可以添加更多交互逻辑
        });
      });
    },
  },
};
</script>
