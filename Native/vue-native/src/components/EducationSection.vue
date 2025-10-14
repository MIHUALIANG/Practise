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
          <span class="sb__inner"> 20+ Courses </span>
          <!-- .sb__inner -->
        </h3>

        <ul class="s__courses__list">
          <li class="sb-course js-course">
            <span class="sb__inner">
              Creating a One Year Indie Music Plan
            </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner">
              Building an Unstoppable Brand Identity
            </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> The art of Vision Boarding </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> 5 Tips for Artists Going On Tour </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Music Business Intro </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner">
              How to Manage Yourself as an Artist on the Road
            </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Marketing for Artists </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Building a team </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Artist Career Path </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Music Publishing 101 </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner">
              Writing your Business Plan (Business model canvas)
            </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Music Releasing Strategies </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Music Marketing and Promotion </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Tour Management and Booking </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Artist Development Strategies </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Copyright and Intellectual Property </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Starting an indie record label </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Agreements and Contracts 101 </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Intro to Artist Management </span>
            <!-- .sb__inner -->
          </li>
          <li class="sb-course js-course">
            <span class="sb__inner"> Setting up YOUR business </span>
            <!-- .sb__inner -->
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

<script>
export default {
  name: "EducationSection",
};
</script>

<style scoped>
/* Layout */
.s-education-home {
  position: relative;
  padding: 104px 0 112px;
  background: #eaf7f0; /* soft green background closer to original */
  color: #2a2925;
}

.u-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.s__content {
  position: relative;
  z-index: 1;
}

/* Headings & text */
.t-suptitle {
  display: block;
  font-size: 14px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6f6c66;
  margin: 0 0 12px;
}

.t-title {
  font-size: 44px;
  line-height: 1.15;
  font-weight: 700;
  margin: 0 0 16px;
}

.s__text {
  font-size: 18px;
  line-height: 1.7;
  color: #3b3a34;
  max-width: 760px;
}

.s__text a {
  color: #00c389;
  text-decoration: underline;
}

/* Background decorative layer */
.s__background {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
      1200px 600px at 90% 0%,
      rgba(0, 195, 137, 0.18),
      rgba(0, 195, 137, 0)
    ),
    radial-gradient(
      900px 500px at 0% 100%,
      rgba(0, 195, 137, 0.1),
      rgba(0, 195, 137, 0)
    );
  mix-blend-mode: normal;
}

/* Courses */
.s__courses {
  position: relative;
  z-index: 1;
  margin-top: 48px;
}

.sb-course--title {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2a2925;
  margin: 0 0 18px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(0, 195, 137, 0.16);
}

.s__courses__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

@media (min-width: 992px) {
  .s__courses__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px 24px;
  }
}

.sb-course {
  position: relative;
  padding: 16px 18px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid rgba(0, 195, 137, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.sb-course:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
}

.sb__inner {
  display: inline-block;
  font-size: 15.5px;
  line-height: 1.5;
  color: #2a2925;
}

/* Responsive type scale close to original */
@media (min-width: 768px) {
  .t-title {
    font-size: 48px;
  }
}

@media (min-width: 1200px) {
  .t-title {
    font-size: 54px;
  }
}
</style>
