import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {


  ngOnInit(): void {
    const container = document.querySelector(".container") as HTMLElement;
    const sections = gsap.utils.toArray(".container section") as HTMLElement[];
    const texts = gsap.utils.toArray(".anim") as HTMLElement[];
    const mask = document.querySelector(".mask") as HTMLElement;

    gsap.registerPlugin(ScrollTrigger);

    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: "+=3000",
        //snap: 1 / (sections.length - 1),
        markers: true,
      }
    });

    console.log(1 / (sections.length - 1))

    //Progress bar animation

    gsap.to(mask, {
      width: "100%",
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top left",
        scrub: 1
      }
    });

    // whizz around the sections
    sections.forEach((section) => {
      // grab the scoped text
      let text = section.querySelectorAll(".anim");
      
      // bump out if there's no items to animate
      if(text.length === 0)  return 
      
      // do a little stagger
      gsap.from(text, {
        y: -130,
        opacity: 0,
        duration: 2,
        ease: "elastic",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          containerAnimation: scrollTween,
          start: "left center",
          markers: true
        }
      });
    });
  }
}
