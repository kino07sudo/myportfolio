import instagram from '../assets/instagram.png'
import Discord from '../assets/discord.png'
import X from "../assets/X.png";
import mainpic from '../assets/mainpic.png'
import hi from '../assets/cinnamon.png'
import { Mail } from 'lucide-react'

const Hero = ({ darkMode }) => {
  const socialIcons = [
    {
      icon: instagram,
      alt: 'Instagram',
      link: 'https://www.instagram.com/1ofnonee3e/',
    },
    {
      icon: Discord,
      alt: 'Discord',
      link: 'https://discord.com/users/987003190849449994',
    },
    {
      icon: X,
      alt: 'X',
      link: 'https://x.com/dfntlyntkino',
    },
  ];

  const darkTheme = {
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    buttonSecondary: 'text-white border-2 border-orange-500 hover:bg-orange-600',
    decorativeCircle: 'bg-orange-500 opacity-10',
  };

  const lightTheme = {
    textPrimary: 'text-black',
    textSecondary: 'text-gray-700',
    buttonSecondary: 'text-gray-800 border-2 border-orange-500 hover:bg-orange-600 hover:text-white',
    decorativeCircle: 'bg-orange-400 opacity-20',
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col">
      <section
        id="home"
        data-aos="fade-up"
        data-aos-delay="250"
        className="body-font z-10"
      >
        <div className="container mx-auto flex px-4 sm:px-8 lg:px-14 py-12 lg:py-32 flex-col lg:flex-row items-center justify-between lg:mt-0 mt-14">

          {/* Text */}
          <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0">
            <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 mb-6 sm:mb-7 w-full">
              {socialIcons.map(({ icon, alt, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos-delay={`${400 + index * 100}`}
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src={icon}
                    alt={alt}
                    className={`w-8 h-8 sm:w-10 sm:h-10 object-contain ${
                      darkMode ? '' : 'filter brightness-75'
                    }`}
                  />
                </a>
              ))}
            </div>

            <h1
              className={
                'title-font text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold ' +
                theme.textPrimary
              }
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Hello, I'm Kino
            </h1>

            <p
              className={
                'text-lg sm:text-xl mb-8 leading-relaxed text-justify hyphens-auto ' +
                theme.textSecondary
              }
            >
              I'm currently a student at STI Munoz-College, pursuing a degree in
              Bachelor of Science in Information Technology. I'm passionate in
              learning new technologies and constantly improving my skills in
              backend development.
            </p>

            <a href="#contact" className="w-full sm:w-auto">
              <button
                className={
                  'inline-flex items-center justify-center border-0 py-3 px-6 sm:px-8 hover:shadow-[0_0_40px_rgb(255,165,0,0.7)] rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform ' +
                  theme.buttonSecondary
                }
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Contact me
              </button>
            </a>
          </div>

          {/* Image */}
          <div
            className="lg:w-1/2 w-full max-w-md lg:max-w-lg flex justify-center lg:justify-end"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="relative w-4/5 sm:w-3/4 lg:w-full">
              <div className="relative overflow-hidden">
                <img
                  src={mainpic}
                  alt="Main Image"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              <img
                src={hi}
                alt="Cinnamon"
                className="
                  absolute
                  top-[14%]
                  left-1/2
                  translate-x-[40%]
                  w-14 h-14
                  sm:w-20 sm:h-20
                  object-contain
                  animate-bounce
                  opacity-90
                  z-10
                "
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Hero;
