import styles from "../style_light";
import { footerLinks_useful } from "../constants";


const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>


    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[14px] leading-[27px] text-primary">

        {
          footerLinks_useful.map((footerlink, index) => (
            <span key={`${footerlink.name}`}>
            <a key={`${footerlink.name}`}
               href={`${footerlink.link}`} 
              className={`mr-5 ${index!==0 ? "ml-5" : ""} font-poppins font-normal text-[16px] leading-[24px] text-dimPrimary hover:text-secondary cursor-pointer `}
            >
            {footerlink.name}
            </a>
            {index !== footerLinks_useful.length - 1 && <span>&nbsp;|&nbsp;</span>}
            </span>
          ))
        }

          {/*footerLinks.map((footerlink) => (
            <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
              <h4 className="font-poppins font-medium text-[18px] leading-[20px] text-primary"> {footerlink.title} </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimPrimary hover:text-secondary cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
                  ))*/}
        
      </p>

      {/*<div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
          */}

    </div>
  </section>
);

export default Footer;
