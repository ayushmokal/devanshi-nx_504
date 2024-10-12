"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  date: Date;
  subject: string;
  message: string;
}

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

      const response = await fetch(scriptUrl, {
        method: 'POST',
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

  return (
    <main className="min-h-screen bg-[#FFF9F0]">
      <header className="bg-[#D6C29F] py-4 px-6 shadow-md">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between flex-wrap">
            <div className="flex items-center flex-shrink-0 mr-6">
              <Image
                src="/images/logo.png"
                alt="Devanshi NX Logo"
                width={100}
                height={50}
                className="mr-2"
              />
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

      <section className="relative h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/new-render.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center text-white">
          <img src="/images/englogo.png" alt="Devanshi NX Logo" width={400} height={200} className="mb-8" />
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">Designing your perfect day, the way you imagined</h2>
          <Button onClick={scrollToBookingForm} className="inline-block text-sm px-4 py-2 leading-none text-white hover:border-transparent hover:text-[#8B4513] hover:bg-white mt-4 lg:mt-0 bg-[#8B4513]">
            Book Now
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/images/hallhome.jpeg"
              alt="Banquet Hall"
              width={500}
              height={200}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-2xl font-light text-[#D4AF37] mb-2">Welcome to Devanshi NX</h3>
            <h4 className="text-xl font-bold text-[#8B4513] mb-4">Best banquet hall in Navi Mumbai for Exclusive events, priceless memories</h4>
          {/* <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p> */}
          </div>
        </div>

        {/* Amenities Section with Background */}
        <div className="mb-16 bg-cover bg-center bg-fixed py-16" style={{ backgroundImage: "url('/images/bgam.png')" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#8B4513] drop-shadow-lg">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{
                icon: '/images/tv-icon.png',
                title: 'Projector Screen',
                description: 'Designed to give the attendees a visual experience, making it easier for them to follow along with presentations.'
              },
              {
                icon: '/images/spacious-icon.png',
                title: 'Spacious Hall',
                description: 'Our banquet hall are specially designed to cater large groups of people. The rooms are well-lit and properly ventilated to ensure comfort.'
              },
              {
                icon: '/images/people-icon.png',
                title: '300 People Capacity',
                items: [
                  '300 people at a time',
                  'Efficient use of space for diverse event types'
                ]
              }].map((amenity, index) => (
                <div key={index} className="bg-white bg-opacity-90 border border-[#D4AF37] p-6 rounded-lg text-center shadow-md">
                  <Image
                    src={amenity.icon}
                    alt={amenity.title}
                    width={64}
                    height={64}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-[#8B4513]">{amenity.title}</h3>
                  {amenity.description ? (
                    <p className="text-[#666]">{amenity.description}</p>
                  ) : (
                    <ul className="text-left text-[#666] list-disc pl-5">
                      {amenity.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Events Section */}
        <div className="mb-16 bg-white bg-opacity-90 p-8 rounded-lg">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-center text-[#8B4513]">
              Events Held
            </h2>
            <h2 className="text-3xl font-bold text-center text-[#8B4513] mt-2">
              At The Venue
            </h2>

            <Image 
              src="/images/leafevents.png" 
              alt="Leaf decoration" 
              width={100} 
              height={50}
              className="mt-4" 
              style={{ marginLeft: '210px', marginTop: '-45px' }}
            />
          </div>
          
          {[
            {
              title: 'Weddings',
              image: '/images/weddings.jpeg',
              description: 'Whether planning a warm and intimate gathering or a grand affair, we ensure that your wedding day is unforgettable.',
              align: 'left'
            },
            {
              title: 'Birthdays',
              image: '/images/birthday.jpeg',
              description: 'We provide a versatile venue for all your personal events, where they can enjoy their all types of parties like birthday, baptism, cocktail party, and other personal party programs with full of zeal.',
              align: 'right'
            },
            {
              title: 'Collaborations',
              image: '/images/collabmain.JPG',
              description: 'At The Banquets, we have proudly collaborated with production houses, advertising, styling brands, and other companies, offering our exquisite venues as the ideal backdrop for their creative projects.',
              align: 'left'
            }
          ].map((event, index) => (
            <div key={event.title} className={`flex flex-col ${event.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch mb-12`}>
              <div className={`w-full md:w-1/2 relative ${event.align === 'right' ? 'md:pl-4' : 'md:pr-4'}`}>
                <Image
                  src={event.image}
                  alt={event.title}
                  width={500}
                  height={300}
                  objectFit="cover"
                  className="rounded-lg shadow-md"
                />
                <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white drop-shadow-lg">
                  {event.title}
                </h3>
              </div>
              <div className={`w-full md:w-1/2 ${event.align === 'right' ? 'md:pr-4' : 'md:pl-4'} bg-[#F5E6D3] p-6 rounded-lg flex flex-col justify-center relative shadow-md`}>
                <p className="text-[#666] mb-4">{event.description}</p>
                <Link href={`/events`} className="text-[#8B4513] font-semibold hover:underline">
                  Read more
                </Link>
                <Image 
                  src="/images/leafevents.png" 
                  alt="Leaf decoration" 
                  width={50} 
                  height={100} 
                  className={`absolute bottom-2 ${event.align === 'right' ? 'left-2' : 'right-2'}`} 
                  style={{ marginLeft: '210px', marginTop: '-45px' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Updated Booking Form */}
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
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Email"
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
      </section>

      {/* Updated Footer */}
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
                Plot No. L-1, Sector KWC, Near Express Way, next to Devanshi Inn Hotel,
                Kalamboli, Panvel, Maharashtra 410218
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
                    <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.601509396352!2d73.10037567510857!3d19.037273353187345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e9e9d7678267%3A0xc62064ffc5975921!2sAmarante%2C%20NEELSIDHI%20AMARANTE%2C%20Roadpali%2C%20Kalamboli%2C%20Panvel%2C%20Navi%20Mumbai%2C%20Maharashtra%20410218!5e0!3m2!1sen!2sin!4v1728627366842!5m2!1sen!2sin"
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