import Image from "next/image"
import heroImage from "../public/heroimage.svg"

const Hero = () => {
  return (
      <section className="container mx-auto">
            <Image
              src={heroImage}
              alt="Hero Image"
            />
      </section>
  )
}

export default Hero