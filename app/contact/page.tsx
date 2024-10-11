"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, SubmitHandler } from 'react-hook-form';
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

export default function Contact() {
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
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Devanshi NX Logo"
                  width={100}
                  height={50}
                  className="mr-2 cursor-pointer"
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

          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-center text-[#8B4513]">
              Contact Us
            </h2>
            <h2 className="text-3xl font-bold text-center text-[#8B4513] mt-2">
              Devanshi NX Banquets
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#F5E6D3] p-6 rounded-lg shadow-md text-center">
            <h2 className="font-bold mb-2 text-[#8B4513]">ADDRESS</h2>
            <p className="text-sm">Plot No. L-1, Sector KWC,</p>
            <p className="text-sm">Near Express Way,</p>
            <p className="text-sm">next to Devanshi Inn Hotel,</p>
            <p className="text-sm">Kalamboli, Panvel, Maharashtra 410218</p>
            <a href="#" className="text-sm text-blue-600 hover:underline">View On Google Map</a>
          </div>
          <div className="bg-[#F5E6D3] p-6 rounded-lg shadow-md text-center">
            <h2 className="font-bold mb-2 text-[#8B4513]">CALL</h2>
            <p className="text-sm">9820323781</p>
            <p className="text-sm">9022710001</p>
          </div>
          <div className="bg-[#F5E6D3] p-6 rounded-lg shadow-md text-center">
            <h2 className="font-bold mb-2 text-[#8B4513]">EMAIL</h2>
            <p className="text-sm">tiarabanquets@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 bg-[#8B4513] p-6 rounded-lg shadow-md text-white">
            <h2 className="text-2xl font-bold mb-4">It's Your Turn</h2>
            <Image
              src="/images/logo.png"
              alt="Devanshi Banquet Hall, Studio & Lodging"
              width={200}
              height={100}
              className="mb-4"
            />
            <p className="mb-4">Book Now!</p>
            <Button className="bg-white text-[#8B4513] hover:bg-[#F5E6D3]">
              Book
            </Button>
          </div>

          <div className="md:w-2/3 bg-[#F5E6D3] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#8B4513]">Contact Us</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input {...register('name')} placeholder="Full Name" className="bg-white" />
                <Input {...register('email')} placeholder="Email" type="email" className="bg-white" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input {...register('phone')} placeholder="Phone" type="tel" className="bg-white" />
                <Input {...register('subject')} placeholder="Subject" className="bg-white" />
              </div>
              <Textarea {...register('message')} placeholder="Message" className="bg-white" rows={4} />
              <Button type="submit" className="bg-[#8B4513] text-white hover:bg-[#6F3609] w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-[#F5E6D3] text-[#8B4513] py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div className="w-2/3">
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
              <p className="text-sm mb-1">9820323781</p>
              <p className="text-sm mb-4">9022710001</p>
              <h2 className="text-xl font-bold mb-2">Email Us</h2>
              <p className="text-sm mb-4">tiarabanquets@gmail.com</p>
              
              <div className="flex items-center mb-8">
                <Input placeholder="Your Email Address" className="bg-white mr-2 w-64" />
                <Button className="bg-[#8B4513] hover:bg-[#6F3609] text-white">
                  Subscribe Now
                </Button>
              </div>

              <div className="flex space-x-16 mb-8">
                <div>
                  <h3 className="font-bold mb-2">Our Events</h3>
                  <ul className="text-sm">
                    <li>Wedding</li>
                    <li>Engagement</li>
                    <li>Birthday Party</li>
                    <li>Corporate Events</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Quick Links</h3>
                  <ul className="text-sm">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About us</Link></li>
                    <li><Link href="/amenities">Amenities</Link></li>
                    <li><Link href="/events">Events</Link></li>
                    <li><Link href="/gallery">Gallery</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/contact">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="w-1/3">
              <div className="bg-white p-4 w-full h-full">
                <h2 className="text-xl font-bold mb-4">LOCATION - MAP</h2>
                {/* Add your map component or iframe here */}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm">Copyright © 2022. All rights reserved | Crafted by 504 LABS</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
