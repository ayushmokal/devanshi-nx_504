"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Galleria } from 'primereact/galleria';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  date: Date;
  subject: string;
  message: string;
}

const PhotoService = {
  getImages: () => Promise.resolve([
    { itemImageSrc: "/images/gallery/1.jpeg", thumbnailImageSrc: "/images/gallery/1.jpeg", alt: "Gallery Image 1" },
    { itemImageSrc: "/images/gallery/2.jpeg", thumbnailImageSrc: "/images/gallery/2.jpeg", alt: "Gallery Image 2" },
    { itemImageSrc: "/images/gallery/4.jpeg", thumbnailImageSrc: "/images/gallery/4.jpeg", alt: "Gallery Image 4" },
    { itemImageSrc: "/images/gallery/5.jpeg", thumbnailImageSrc: "/images/gallery/5.jpeg", alt: "Gallery Image 5" },
    { itemImageSrc: "/images/gallery/6.jpeg", thumbnailImageSrc: "/images/gallery/6.jpeg", alt: "Gallery Image 6" },
    { itemImageSrc: "/images/gallery/7.jpeg", thumbnailImageSrc: "/images/gallery/7.jpeg", alt: "Gallery Image 7" },
    { itemImageSrc: "/images/gallery/8.jpeg", thumbnailImageSrc: "/images/gallery/8.jpeg", alt: "Gallery Image 8" },
    { itemImageSrc: "/images/gallery/44.jpeg", thumbnailImageSrc: "/images/gallery/44.jpeg", alt: "Gallery Image 44" },
    { itemImageSrc: "/images/gallery/about.png", thumbnailImageSrc: "/images/gallery/about.png", alt: "About Image" },
    { itemImageSrc: "/images/gallery/SAP_8566.JPG", thumbnailImageSrc: "/images/gallery/SAP_8566.JPG", alt: "SAP Image 8566" },
    { itemImageSrc: "/images/gallery/SAP_8588.JPG", thumbnailImageSrc: "/images/gallery/SAP_8588.JPG", alt: "SAP Image 8588" },
    { itemImageSrc: "/images/gallery/SAP_8589.JPG", thumbnailImageSrc: "/images/gallery/SAP_8589.JPG", alt: "SAP Image 8589" },
    { itemImageSrc: "/images/gallery/SAP_8596.JPG", thumbnailImageSrc: "/images/gallery/SAP_8596.JPG", alt: "SAP Image 8596" },
    { itemImageSrc: "/images/gallery/SAP_8623.JPG", thumbnailImageSrc: "/images/gallery/SAP_8623.JPG", alt: "SAP Image 8623" },
  ])
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const scrollToBookingForm = () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<IFormInput>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwIZAV5cfWXXVNQ3Jk4_EOhsgPOBmcOd4HeE5w7Lr_qwhdZIs3htfBxSZB9n1oBBPPtTw/exec';

    try {
      data.date = data.date.toLocaleDateString('en-GB'); // This will format the date as dd/mm/yyyy

      void await fetch(scriptUrl, {        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [images, setImages] = useState(null);
  const responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 4
    },
    {
      breakpoint: '767px',
      numVisible: 3
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  useEffect(() => {
    PhotoService.getImages().then(data => setImages(data));
  }, []);

  const itemTemplate = (item) => {
    return (
      <Image 
        src={item.itemImageSrc} 
        alt={item.alt} 
        width={640}
        height={480}
        className="w-full"
        style={{ display: 'block' }}
      />
    );  
  }

  const thumbnailTemplate = (item) => {
    return (
      <Image 
        src={item.thumbnailImageSrc} 
        alt={item.alt} 
        width={100}
        height={75}
        className="w-full"
        style={{ display: 'block' }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F0]">
      <header className="bg-[#D6C29F] py-4 px-6 shadow-md">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between flex-wrap">
            <div className="flex items-center flex-shrink-0 mr-6">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Devanshi NX Logo"
                  width={100}
                  height={50}
                  className="mr-2"
                />
              </Link>
            </div>
            <div className="block lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center px-3 py-2 border rounded text-[#8B4513] border-[#D4AF37] hover:text-[#B8860B] hover:border-[#B8860B]"
              >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                </svg>
              </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? '' : 'hidden'}`}>
              <div className="text-center text-xl lg:flex-grow">
                {navItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className="block mt-4 lg:inline-block lg:mt-0 text-[#8B4513] hover:text-[#B8860B] mr-8"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div>
                <Button onClick={scrollToBookingForm} className="inline-block text-sm px-4 py-2 leading-none text-white hover:border-transparent hover:text-[#8B4513] hover:bg-white mt-4 lg:mt-0 bg-[#8B4513]">
                  Book Now
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-center text-[#8B4513] mt-2">
            Gallery
          </h2>
          <Image 
            src="/images/leafevents.png" 
            alt="Leaf decoration" 
            width={100} 
            height={50}
            className="mt-4" 
            style={{ marginLeft: '120px', marginTop: '-45px' }}
          />
        </div>

        <div className="mb-16">
          <div className="card">
            <Galleria 
              value={images} 
              responsiveOptions={responsiveOptions} 
              numVisible={5} 
              style={{ maxWidth: '640px', margin: '0 auto' }} 
              item={itemTemplate} 
              thumbnail={thumbnailTemplate} 
              circular 
              autoPlay 
              transitionInterval={2000} 
            />
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <div id="booking-form" className="bg-[#F5E6D3] p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#8B4513]">Booking Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="bg-white"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div>
              <Input
                {...register("email", { required: "Email is required" })}
                placeholder="Your Email"
                type="email"
                className="bg-white"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <Input
                {...register("phone", { required: "Phone number is required" })}
                placeholder="Phone no"
                type="tel"
                className="bg-white"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </div>
            <div>
              <Controller
                control={control}
                name="date"
                rules={{ required: "Date is required" }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value}
                    onChange={(date: Date) => onChange(date)}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="dd-mm-yy"
                    className="bg-white w-full p-2 rounded-md"
                  />
                )}
              />
              {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
            </div>
          </div>
          <div>
            <Input
              {...register("subject", { required: "Subject is required" })}
              placeholder="Subject"
              className="bg-white"
            />
            {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
          </div>
          <div>
            <Textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Message"
              className="bg-white"
              rows={4}
            />
            {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
          </div>
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`inline-block text-sm px-4 py-2 leading-none text-white hover:border-transparent hover:text-[#8B4513] hover:bg-white mt-4 lg:mt-0 bg-[#8B4513] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
        {submitStatus === 'success' && (
          <p className="mt-4 text-green-600 text-center">Form submitted successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="mt-4 text-red-600 text-center">An error occurred. Please try again.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#F5E6D3] text-[#8B4513] py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <Image
                src="/images/logo.png"
                alt="Devanshi Logo"
                width={150}
                height={75}
                className="mb-4"
              />
              <h2 className="text-xl font-bold mb-2">Banquet Address</h2>
              <p className="text-sm mb-4">
              Neelsidhi Amrante, Shop No. F-12,13,14,15, 1st Floor,
              Near Dmart, Sector-9E, Kalamboli, Navi Mumbai, Maharashtra - 410218.
              </p>
              <h2 className="text-xl font-bold mb-2">Contact us</h2>
            <a href="tel:+919529023967" className="block text-sm text-blue-600 hover:underline mb-1">9529023967</a>
            <a href="tel:+918976666612" className="block text-sm text-blue-600 hover:underline">8976666612</a>
            <a href="tel:+919833863645" className="block text-sm text-blue-600 hover:underline">9833863645</a>
              <h2 className="text-xl font-bold mb-2">Email Us</h2>
              <a href="mailto:nxdevanshi@gmail.com" className="text-sm text-blue-600 hover:underline">nxdevanshi@gmail.com</a>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-16 mb-8">
                <div>
                  <h3 className="font-bold mb-2">Our Events</h3>
                  <ul className="text-sm">
                    <li><Link href="/events" className="hover:underline">Wedding</Link></li>
                    <li><Link href="/events" className="hover:underline">Engagement</Link></li>
                    <li><Link href="/events" className="hover:underline">Birthday Party</Link></li>
                    <li><Link href="/events" className="hover:underline">Corporate Events</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Quick Links</h3>
                  <ul className="text-sm">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/about" className="hover:underline">About us</Link></li>
                    <li><Link href="/amenities" className="hover:underline">Amenities</Link></li>
                    <li><Link href="/events" className="hover:underline">Events</Link></li>
                    <li><Link href="/gallery" className="hover:underline">Gallery</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.6044122273147!2d73.10056041084131!3d19.037145553116684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e90034f8b5fd%3A0x1592d6d1695a6f2f!2sDevanshi%20NX%20Banquets%20and%20Lodging!5e0!3m2!1sen!2sin!4v1732044938634!5m2!1sen!2sin"
                  width="360px"
                  height="400px"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
  <p className="text-sm">
    Copyright © 2024. All rights reserved | Crafted by <a href="https://504labs.tech/" target="_blank" rel="noopener noreferrer" className="white hover:underline">504 LABS</a>
  </p>
</div>
        </div>
      </footer>  
    </main>
  );
}