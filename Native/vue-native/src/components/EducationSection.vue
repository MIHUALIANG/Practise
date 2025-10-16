<template>
  <!-- 网站主容器 -->
  <div class="site-container">
    <!-- 主要内容区域，使用首页布局 -->
    <main class="l-front-page" data-plr-layout="front-page" data-lg-page>
      <!-- 教育首页组件容器 -->
      <div
        class="s-education-home"
        data-plr-component="s-education-home"
        id="education"
      >
        <!-- 组件内部容器 -->
        <div class="s__inner">
          <!-- 统一容器类，用于限制内容宽度 -->
          <div class="u-container">
            <!-- 主要内容区域，js-content用于JavaScript交互 -->
            <div class="s__content js-content">
              <!-- 副标题：Education -->
              <h2 class="s__suptitle t-suptitle">Education</h2>

              <!-- 主标题：We help artists grow -->
              <p class="s__title t-title">We help artists grow</p>

              <!-- 描述文本，包含课程链接 -->
              <p class="s__text rte">
                Access expert-led
                <a href="https://learn.247artists.com/">online courses</a>, live
                webinars, and mentorship programs designed to sharpen your
                skills and expand your career opportunities.
              </p>

              <!-- 背景装饰元素 -->
              <div class="s__background"></div>
            </div>
          </div>

          <!-- 课程列表容器 -->
          <div class="s__courses">
            <!-- 课程数量标题 -->
            <h3 class="sb-course sb-course--title js-course">
              <span class="sb__inner"> 20+ Courses </span>
            </h3>

            <!-- 课程列表 -->
            <ul class="s__courses__list">
              <!-- 课程项目1：独立音乐一年计划 -->
              <li class="sb-course js-course">
                <span class="sb__inner">
                  Creating a One Year Indie Music Plan
                </span>
              </li>
              <!-- 课程项目2：建立不可阻挡的品牌身份 -->
              <li class="sb-course js-course">
                <span class="sb__inner">
                  Building an Unstoppable Brand Identity
                </span>
              </li>
              <!-- 课程项目3：愿景板艺术 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> The art of Vision Boarding </span>
              </li>
              <!-- 课程项目4：艺术家巡演5个技巧 -->
              <li class="sb-course js-course">
                <span class="sb__inner">
                  5 Tips for Artists Going On Tour
                </span>
              </li>
              <!-- 课程项目5：音乐商业入门 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Music Business Intro </span>
              </li>
              <!-- 课程项目6：巡演中的自我管理 -->
              <li class="sb-course js-course">
                <span class="sb__inner">
                  How to Manage Yourself as an Artist on the Road
                </span>
              </li>
              <!-- 课程项目7：艺术家营销 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Marketing for Artists </span>
              </li>
              <!-- 课程项目8：建立团队 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Building a team </span>
              </li>
              <!-- 课程项目9：艺术家职业道路 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Artist Career Path </span>
              </li>
              <!-- 课程项目10：音乐出版101 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Music Publishing 101 </span>
              </li>
              <!-- 课程项目11：商业计划写作 -->
              <li class="sb-course js-course">
                <span class="sb__inner">
                  Writing your Business Plan (Business model canvas)
                </span>
              </li>
              <!-- 课程项目12：音乐发行策略 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Music Releasing Strategies </span>
              </li>
              <!-- 课程项目13：音乐营销和推广 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Music Marketing and Promotion </span>
              </li>
              <!-- 课程项目14：巡演管理和预订 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Tour Management and Booking </span>
              </li>
              <!-- 课程项目15：艺术家发展策略 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Artist Development Strategies </span>
              </li>
              <!-- 课程项目16：版权和知识产权 -->
              <li class="sb-course js-course">
                <span class="sb__inner">
                  Copyright and Intellectual Property
                </span>
              </li>
              <!-- 课程项目17：创办独立唱片公司 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Starting an indie record label </span>
              </li>
              <!-- 课程项目18：协议和合同101 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Agreements and Contracts 101 </span>
              </li>
              <!-- 课程项目19：艺术家管理入门 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Intro to Artist Management </span>
              </li>
              <!-- 课程项目20：建立你的业务 -->
              <li class="sb-course js-course">
                <span class="sb__inner"> Setting up YOUR business </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- 功能特性首页组件容器 -->
  <div
    class="s-features-home"
    data-plr-component="s-features-home"
    id="technology"
  >
    <!-- 组件内部容器 -->
    <div class="s__inner">
      <!-- 主要内容区域 -->
      <div class="s__content js-content">
        <!-- 副标题：Technology -->
        <h2 class="s__suptitle t-suptitle js-suptitle">Technology</h2>

        <!-- 主标题：简化业务 -->
        <p class="s__title t-title js-title">
          We simplify<br />
          the business
        </p>
      </div>

      <!-- 功能特性列表容器 -->
      <div class="s__features js-features">
        <!-- 功能特性1：所有权分配 -->
        <div class="sb-feature js-feature">
          <div class="sb__inner">
            <!-- 计数器组件 -->
            <div class="sb__counter">
              <!-- 当前序号 -->
              <div class="sb__counter__number sb__counter__number--index">
                01
              </div>
              <!-- .sb__counter__number -->

              <!-- 总数量 -->
              <div class="sb__counter__number sb__counter__number--total">
                05
              </div>
              <!-- .sb__counter__number -->
            </div>
            <!-- .sb__counter -->

            <!-- 图标区域 -->
            <div class="sb__icon">
              <!-- 所有权分配图标 - 圆形分割图标 -->
              <span class="a-svg a-svg--ownership"
                ><svg
                  width="71"
                  height="71"
                  viewBox="0 0 71 71"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <!-- 圆形分割路径1 -->
                  <path
                    d="M62.3323 38.2422L8.66016 38.2422C9.08583 42.1032 10.3256 45.7189 12.204 48.9141L58.7884 48.9141C60.6669 45.7189 61.9066 42.1032 62.3323 38.2422Z"
                    fill="#2A2925"
                  />
                  <!-- 圆形分割路径2 -->
                  <path
                    d="M53.9984 54.9141L16.9941 54.9141C21.8266 59.4628 28.3359 62.25 35.4962 62.25C42.6565 62.25 49.1658 59.4628 53.9984 54.9141Z"
                    fill="#2A2925"
                  />
                  <!-- 圆形分割路径3 -->
                  <path
                    d="M62.3306 32.2422L8.66188 32.2422C9.08952 28.3839 10.3301 24.7709 12.2086 21.5781L58.7838 21.5781C60.6623 24.7709 61.9029 28.3839 62.3306 32.2422Z"
                    fill="#2A2925"
                  />
                  <!-- 圆形分割路径4 -->
                  <path
                    d="M53.9901 15.5781C49.1584 11.034 42.6524 8.25 35.4962 8.25C28.34 8.25 21.8341 11.0341 17.0024 15.5781L53.9901 15.5781Z"
                    fill="#2A2925"
                  /></svg
              ></span>
            </div>
            <!-- .sb__icon -->

            <!-- 内容区域 -->
            <div class="sb__content">
              <!-- 功能标题 -->
              <h3 class="sb__title t-title">Ownership Splits</h3>

              <!-- 功能描述 -->
              <p class="sb__description">
                Clear ownership splits so everyone gets their fair share.
              </p>
              <!-- .sb__description -->
            </div>
            <!-- .sb__content -->

            <!-- 图片展示区域 -->
            <div class="sb__images sb__images--2">
              <!-- 图片1：所有权分配界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Splits-v1-720x721.jpg"
                  alt=""
                  width="720"
                  height="721"
                />
              </div>
              <!-- .sb__image -->
              <!-- 图片2：所有权分配界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Splits-v2-720x721.jpg"
                  alt=""
                  width="720"
                  height="721"
                />
              </div>
              <!-- .sb__image -->
            </div>
            <!-- .sb__images -->
          </div>
          <!-- .sb__inner -->

          <!-- 侧边计数器 -->
          <div class="sb__side-counter">01</div>
          <!-- .sb__side-counter -->

          <!-- 装饰线条 -->
          <div class="sb__side sb__side--vertical"></div>
          <div class="sb__side sb__side--horizontal"></div>
        </div>
        <!-- .sb-feature -->
        <!-- 功能特性2：协议 -->
        <div class="sb-feature js-feature">
          <div class="sb__inner">
            <!-- 计数器组件 -->
            <div class="sb__counter">
              <!-- 当前序号 -->
              <div class="sb__counter__number sb__counter__number--index">
                02
              </div>
              <!-- .sb__counter__number -->

              <!-- 总数量 -->
              <div class="sb__counter__number sb__counter__number--total">
                05
              </div>
              <!-- .sb__counter__number -->
            </div>
            <!-- .sb__counter -->

            <!-- 图标区域 -->
            <div class="sb__icon">
              <!-- 协议图标 - 文档图标 -->
              <span class="a-svg a-svg--agreements"
                ><svg
                  width="71"
                  height="71"
                  viewBox="0 0 71 71"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <!-- 文档主体 -->
                  <path
                    d="M24.4961 7.25H57.4961V63.25H24.4961V7.25Z"
                    fill="#2A2925"
                  />
                  <!-- 文档装订线 -->
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.4961 7.25391L19.4961 63.25H13.4961L13.4961 7.25391L19.4961 7.25391Z"
                    fill="#2A2925"
                  /></svg
              ></span>
            </div>
            <!-- .sb__icon -->

            <!-- 内容区域 -->
            <div class="sb__content">
              <!-- 功能标题 -->
              <h3 class="sb__title t-title">Agreements</h3>

              <!-- 功能描述 -->
              <p class="sb__description">
                Simple, ready-to-use agreements to keep you safe and focused on
                your music.
              </p>
              <!-- .sb__description -->
            </div>
            <!-- .sb__content -->

            <!-- 图片展示区域 -->
            <div class="sb__images sb__images--2">
              <!-- 图片1：协议界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Agreements-v2-720x721.jpg"
                  alt=""
                  width="720"
                  height="721"
                />
              </div>
              <!-- .sb__image -->
              <!-- 图片2：协议界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Agreements-v1-720x721.jpg"
                  alt=""
                  width="720"
                  height="721"
                />
              </div>
              <!-- .sb__image -->
            </div>
            <!-- .sb__images -->
          </div>
          <!-- .sb__inner -->

          <!-- 侧边计数器 -->
          <div class="sb__side-counter">02</div>
          <!-- .sb__side-counter -->

          <!-- 装饰线条 -->
          <div class="sb__side sb__side--vertical"></div>
          <div class="sb__side sb__side--horizontal"></div>
        </div>
        <!-- .sb-feature -->
        <!-- 功能特性3：目录和文件管理 -->
        <div class="sb-feature js-feature">
          <div class="sb__inner">
            <!-- 计数器组件 -->
            <div class="sb__counter">
              <!-- 当前序号 -->
              <div class="sb__counter__number sb__counter__number--index">
                03
              </div>
              <!-- .sb__counter__number -->

              <!-- 总数量 -->
              <div class="sb__counter__number sb__counter__number--total">
                05
              </div>
              <!-- .sb__counter__number -->
            </div>
            <!-- .sb__counter -->

            <!-- 图标区域 -->
            <div class="sb__icon">
              <!-- 文件管理图标 - 文件夹图标 -->
              <span class="a-svg a-svg--files"
                ><svg
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <!-- 剪切路径组 -->
                  <g clip-path="url(#svg3-clip0_1653_1853)">
                    <!-- 文件夹主体 -->
                    <path
                      d="M9.28076 25.7302H63.2808V65.7302H9.28076V25.7302Z"
                      fill="#2A2925"
                      style="
                        fill: #2a2925;
                        fill: color(display-p3 0.1647 0.1608 0.1451);
                        fill-opacity: 1;
                      "
                    />
                    <!-- 文件夹标签 -->
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M55.2902 11.5272H17.2722V5.52722H55.2902V11.5272ZM59.3442 21.5272H13.2192V15.5272H59.3442V21.5272Z"
                      fill="#2A2925"
                      style="
                        fill: #2a2925;
                        fill: color(display-p3 0.1647 0.1608 0.1451);
                        fill-opacity: 1;
                      "
                    />
                  </g>
                  <!-- 定义剪切路径 -->
                  <defs>
                    <clipPath id="svg3-clip0_1653_1853">
                      <rect
                        width="55"
                        height="62"
                        fill="white"
                        style="fill: white; fill-opacity: 1"
                        transform="translate(8.5 4.69922)"
                      />
                    </clipPath>
                  </defs></svg
              ></span>
            </div>
            <!-- .sb__icon -->

            <!-- 内容区域 -->
            <div class="sb__content">
              <!-- 功能标题 -->
              <h3 class="sb__title t-title">Catalog and File Management</h3>

              <!-- 功能描述 -->
              <p class="sb__description">
                Organize and share your entire catalog in one secure place.
              </p>
              <!-- .sb__description -->
            </div>
            <!-- .sb__content -->

            <!-- 图片展示区域 -->
            <div class="sb__images sb__images--2">
              <!-- 图片1：目录管理界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Catalog-v1-720x720.jpg"
                  alt=""
                  width="720"
                  height="720"
                />
              </div>
              <!-- .sb__image -->
              <!-- 图片2：目录管理界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Catalog-v2-720x721.jpg"
                  alt=""
                  width="720"
                  height="721"
                />
              </div>
              <!-- .sb__image -->
            </div>
            <!-- .sb__images -->
          </div>
          <!-- .sb__inner -->

          <!-- 侧边计数器 -->
          <div class="sb__side-counter">03</div>
          <!-- .sb__side-counter -->

          <!-- 装饰线条 -->
          <div class="sb__side sb__side--vertical"></div>
          <div class="sb__side sb__side--horizontal"></div>
        </div>
        <!-- .sb-feature -->
        <!-- 功能特性4：歌曲注册 -->
        <div class="sb-feature js-feature">
          <div class="sb__inner">
            <!-- 计数器组件 -->
            <div class="sb__counter">
              <!-- 当前序号 -->
              <div class="sb__counter__number sb__counter__number--index">
                04
              </div>
              <!-- .sb__counter__number -->

              <!-- 总数量 -->
              <div class="sb__counter__number sb__counter__number--total">
                05
              </div>
              <!-- .sb__counter__number -->
            </div>
            <!-- .sb__counter -->

            <!-- 图标区域 -->
            <div class="sb__icon">
              <!-- 歌曲注册图标 - 美元符号图标 -->
              <span class="a-svg a-svg--registration"
                ><svg
                  width="71"
                  height="71"
                  viewBox="0 0 71 71"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <!-- 美元符号的竖线部分 -->
                  <path
                    d="M36.0251 33.0908H32.8821V29.1149H36.0251C37.1803 29.1149 38.0668 29.9477 38.0668 31.076C38.0668 32.2043 37.1803 33.0908 36.0251 33.0908Z"
                    fill="#2A2925"
                  />
                  <!-- 美元符号主体 -->
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M35.4975 63.3594C51.0097 63.3594 63.5849 50.7744 63.5849 35.25C63.5849 19.7256 51.0097 7.14062 35.4975 7.14062C19.9853 7.14062 7.41016 19.7256 7.41016 35.25C7.41016 50.7744 19.9853 63.3594 35.4975 63.3594ZM28.9062 25.2734V44.078H32.8821V36.9054H34.9237L39.1682 44.078H44.0037L39.0876 36.2876C40.9412 35.3742 42.0963 33.4937 42.0963 31.076C42.0963 27.8524 39.3294 25.2734 36.1595 25.2734H28.9062Z"
                    fill="#2A2925"
                  /></svg
              ></span>
            </div>
            <!-- .sb__icon -->

            <!-- 内容区域 -->
            <div class="sb__content">
              <!-- 功能标题 -->
              <h3 class="sb__title t-title">Song Registrations</h3>

              <!-- 功能描述 -->
              <p class="sb__description">
                Simple, fast song registration to make sure everyone's credited
                and paid.
              </p>
              <!-- .sb__description -->
            </div>
            <!-- .sb__content -->

            <!-- 图片展示区域 -->
            <div class="sb__images sb__images--2">
              <!-- 图片1：歌曲注册界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Song-Registration-v2-720x720.jpg"
                  alt=""
                  width="720"
                  height="720"
                />
              </div>
              <!-- .sb__image -->
              <!-- 图片2：歌曲注册界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Song-Registration-v1-720x721.jpg"
                  alt=""
                  width="720"
                  height="721"
                />
              </div>
              <!-- .sb__image -->
            </div>
            <!-- .sb__images -->
          </div>
          <!-- .sb__inner -->

          <!-- 侧边计数器 -->
          <div class="sb__side-counter">04</div>
          <!-- .sb__side-counter -->

          <!-- 装饰线条 -->
          <div class="sb__side sb__side--vertical"></div>
          <div class="sb__side sb__side--horizontal"></div>
        </div>
        <!-- .sb-feature -->
        <!-- 功能特性5：支付合作者和团队 -->
        <div class="sb-feature js-feature">
          <div class="sb__inner">
            <!-- 计数器组件 -->
            <div class="sb__counter">
              <!-- 当前序号 -->
              <div class="sb__counter__number sb__counter__number--index">
                05
              </div>
              <!-- .sb__counter__number -->

              <!-- 总数量 -->
              <div class="sb__counter__number sb__counter__number--total">
                05
              </div>
              <!-- .sb__counter__number -->
            </div>
            <!-- .sb__counter -->

            <!-- 图标区域 -->
            <div class="sb__icon">
              <!-- 支付图标 - 美元符号图标 -->
              <span class="a-svg a-svg--pay"
                ><svg
                  width="71"
                  height="71"
                  viewBox="0 0 71 71"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <!-- 美元符号图标 -->
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M35.4975 63.3594C51.0097 63.3594 63.5849 50.7744 63.5849 35.25C63.5849 19.7256 51.0097 7.14062 35.4975 7.14062C19.9853 7.14062 7.41016 19.7256 7.41016 35.25C7.41016 50.7744 19.9853 63.3594 35.4975 63.3594ZM37.2746 25.1623V21.7812H33.4064V25.105C30.3405 25.7068 28.2201 27.9417 28.2201 30.8644C28.2201 35.1895 31.8861 36.1375 34.8948 36.9156C36.9888 37.4571 38.7645 37.9163 38.7645 39.3744C38.7645 40.6924 37.4751 41.552 35.6127 41.552C33.6069 41.552 32.2029 40.4059 32.2029 38.6294H28.0195C28.0195 41.9245 30.1972 44.5033 33.4064 45.3056V48.7154H37.2746V45.4202C40.6556 44.8185 42.9766 42.4403 42.9766 39.3744C42.9766 34.7633 39.1252 33.8162 36.0651 33.0637C34.0481 32.5676 32.3748 32.1562 32.3748 30.8357C32.3748 29.6609 33.3777 28.9446 34.9823 28.9446C36.8161 28.9446 37.9336 30.0907 37.9622 31.6093H42.3462C42.3462 28.6294 40.7416 25.936 37.2746 25.1623Z"
                    fill="#2A2925"
                  /></svg
              ></span>
            </div>
            <!-- .sb__icon -->

            <!-- 内容区域 -->
            <div class="sb__content">
              <!-- 功能标题 -->
              <h3 class="sb__title t-title">Paying Collaborators & Team</h3>

              <!-- 功能描述 -->
              <p class="sb__description">
                Transparent payouts so your team always knows what they've
                earned.
              </p>
              <!-- .sb__description -->
            </div>
            <!-- .sb__content -->

            <!-- 图片展示区域 -->
            <div class="sb__images sb__images--2">
              <!-- 图片1：支付界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Payments-v2-720x721.jpg"
                  alt=""
                  width="720"
                  height="721"
                />
              </div>
              <!-- .sb__image -->
              <!-- 图片2：支付界面截图 -->
              <div class="sb__image">
                <img
                  loading="lazy"
                  src="https://247artists.com/wp-content/uploads/2025/02/Payments-v1-720x721.jpg"
                  alt=""
                  width="720"
                  height="721"
                />
              </div>
              <!-- .sb__image -->
            </div>
            <!-- .sb__images -->
          </div>
          <!-- .sb__inner -->

          <!-- 侧边计数器 -->
          <div class="sb__side-counter">05</div>
          <!-- .sb__side-counter -->

          <!-- 装饰线条 -->
          <div class="sb__side sb__side--vertical"></div>
          <div class="sb__side sb__side--horizontal"></div>
        </div>
        <!-- .sb-feature -->
      </div>
      <!-- .s__features -->

      <!-- 标尺装饰元素 -->
      <div class="s__ruler js-ruler"></div>

      <!-- Canvas画布，用于动态图形效果 -->
      <canvas class="s__canvas js-canvas"></canvas>
    </div>
    <!-- .s__inner -->
  </div>
  <!-- .s-features-home -->

  <!-- 滚动条组件标记（某些脚本需要此元素存在） -->
  <div class="site-scrollbar" data-plr-component="site-scrollbar">
    <!-- 滚动条轨道 -->
    <div class="site-scrollbar__track"></div>
    <!-- 滚动条滑块 -->
    <div class="site-scrollbar__thumb js-thumb"></div>
  </div>
</template>

<script>
export default {
  name: "EducationSection",

  mounted() {
    // 组件挂载后初始化动画
    this.initAnimations();
  },

  methods: {
    // 初始化动画效果
    initAnimations() {
      // 检查是否有GSAP库
      if (typeof window !== "undefined" && window.gsap) {
        this.setupGSAPAnimations();
      } else {
        // 如果没有GSAP，使用CSS动画作为后备
        this.setupCSSAnimations();
      }
    },

    // 设置GSAP动画
    setupGSAPAnimations() {
      const { gsap } = window;

      // 使用 nextTick 确保DOM已渲染
      this.$nextTick(() => {
        // 内容区域动画
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".s-features-home",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          })
          .from(".js-suptitle", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          })
          .from(
            ".js-title",
            {
              y: 100,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.5"
          );

        // 功能特性动画
        gsap.utils.toArray(".sb-feature").forEach((feature, index) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: feature,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
              },
            })
            .from(feature.querySelector(".sb__inner"), {
              y: 150,
              opacity: 0,
              scale: 0.8,
              duration: 0.8,
              ease: "power2.out",
            })
            .from(
              feature.querySelectorAll(
                ".sb__counter, .sb__icon, .sb__content, .sb__images"
              ),
              {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.4"
            );
        });

        // 标尺动画
        gsap.from(".js-ruler", {
          scaleX: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".s-features-home",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      });
    },

    // 设置CSS动画作为后备
    setupCSSAnimations() {
      // 添加CSS动画类
      // 使用 nextTick 确保DOM已渲染
      this.$nextTick(() => {
        const featuresContainer = document.querySelector(".s-features-home");
        if (featuresContainer) {
          featuresContainer.classList.add("animate-on-scroll");
        }
      });
    },
  },
};
</script>

<style scoped>
/* ===== 基础布局样式 ===== */
.site-container {
  width: 100%;
  min-height: 100vh;
}

.l-front-page {
  width: 100%;
}

/* ===== s-education-home 样式 ===== */
.s-education-home {
  position: relative;
  padding: 104px 0 112px;
  background: #eaf7f0; /* 软绿色背景，接近原始设计 */
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

/* 标题和文本样式 */
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

/* 背景装饰层 */
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

/* 课程样式 */
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

/* 响应式字体缩放 */
@media (min-width: 768px) {
  .t-title {
    font-size: 48px;
  }
}

@media (min-width: 992px) {
  .s__courses__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px 24px;
  }
}

@media (min-width: 1200px) {
  .t-title {
    font-size: 54px;
  }
}

/* ===== s-features-home 样式 ===== */
.s-features-home {
  position: relative;
  padding: 120px 0;
  background: #ffffff;
  overflow: hidden;
}

.s-features-home .s__inner {
  position: relative;
  z-index: 1;
}

/* 功能特性内容区域 */
.s-features-home .s__content {
  text-align: center;
  margin-bottom: 80px;
}

.s-features-home .s__suptitle {
  color: #6f6c66;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.s-features-home .s__title {
  color: #2a2925;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
}

/* 功能特性列表 */
.s__features {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.sb-feature {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 400px;
}

.sb-feature:nth-child(even) {
  flex-direction: row-reverse;
}

.sb-feature .sb__inner {
  display: flex;
  align-items: center;
  gap: 60px;
  width: 100%;
}

.sb-feature:nth-child(even) .sb__inner {
  flex-direction: row-reverse;
}

/* 计数器组件 */
.sb__counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 80px;
}

.sb__counter__number {
  font-size: 24px;
  font-weight: 700;
  color: #2a2925;
  line-height: 1;
}

.sb__counter__number--index {
  color: #00c389;
}

.sb__counter__number--total {
  color: #6f6c66;
  font-size: 16px;
}

/* 图标区域 */
.sb__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.a-svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* 内容区域 */
.sb-feature .sb__content {
  flex: 1;
  max-width: 400px;
}

.sb-feature .sb__title {
  font-size: 32px;
  font-weight: 700;
  color: #2a2925;
  margin: 0 0 16px;
  line-height: 1.2;
}

.sb__description {
  font-size: 18px;
  line-height: 1.6;
  color: #6f6c66;
  margin: 0;
}

/* 图片展示区域 */
.sb__images {
  display: flex;
  gap: 20px;
  flex-shrink: 0;
}

.sb__images--2 {
  width: 400px;
}

.sb__image {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.sb__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 装饰元素 */
.sb__side-counter {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 14px;
  font-weight: 700;
  color: #00c389;
  z-index: 2;
}

.sb-feature:nth-child(even) .sb__side-counter {
  left: 20px;
  right: auto;
}

.sb__side {
  position: absolute;
  background: linear-gradient(90deg, #00c389, transparent);
  z-index: 1;
}

.sb__side--vertical {
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
}

.sb__side--horizontal {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

.sb-feature:nth-child(even) .sb__side--vertical {
  left: 0;
  right: auto;
}

/* 标尺装饰 */
.s__ruler {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #00c389, transparent);
  z-index: 2;
  transform-origin: left center;
  transform: scaleX(0);
}

/* Canvas画布 */
.s__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* 滚动条组件样式 */
.site-scrollbar {
  position: fixed;
  top: 0;
  right: 0;
  width: 4px;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
}

.site-scrollbar__track {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}

.site-scrollbar__thumb {
  width: 100%;
  background: #00c389;
  border-radius: 2px;
  transition: height 0.1s ease;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .sb-feature .sb__inner {
    gap: 40px;
  }

  .sb__images--2 {
    width: 300px;
  }

  .sb-feature .sb__content {
    max-width: 300px;
  }

  .sb-feature .sb__title {
    font-size: 28px;
  }
}

@media (max-width: 992px) {
  .s-features-home {
    padding: 80px 0;
  }

  .s__features {
    gap: 40px;
  }

  .sb-feature {
    flex-direction: column !important;
    min-height: auto;
  }

  .sb-feature:nth-child(even) {
    flex-direction: column !important;
  }

  .sb-feature .sb__inner {
    flex-direction: column !important;
    gap: 30px;
    text-align: center;
  }

  .sb-feature:nth-child(even) .sb__inner {
    flex-direction: column !important;
  }

  .sb__images--2 {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .sb-feature .sb__content {
    max-width: 100%;
  }

  .sb-feature .sb__title {
    font-size: 24px;
  }

  .sb__description {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .s-features-home .s__title {
    font-size: 36px;
  }

  .sb-feature .sb__inner {
    gap: 20px;
  }

  .sb__counter {
    min-width: 60px;
  }

  .sb__counter__number {
    font-size: 20px;
  }

  .sb__icon {
    width: 60px;
    height: 60px;
  }

  .sb__images--2 {
    flex-direction: column;
    gap: 10px;
  }

  .sb__image {
    width: 100%;
  }
}

/* 动画效果 */
.animate-on-scroll .sb-feature {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
}

.animate-on-scroll .sb-feature.animate {
  opacity: 1;
  transform: translateY(0);
}

/* 悬停效果 */
.sb-feature:hover .sb__image {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

.sb-feature:hover .sb__icon svg {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
</style>
