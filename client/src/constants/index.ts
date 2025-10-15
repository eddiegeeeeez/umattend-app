import careerFairExhibitionHall from '@/assets/images/career-fair-exhibition-hall.png';

export const images = {
  careerFairExhibitionHall
};

// Sample event data with dates formatted for timeline view
export const events = [
  {
    id: 1,
    title: 'Tech Innovation Summit 2025',
    date: 'Mar 15',
    dayOfWeek: 'Saturday',
    time: '2:00 PM',
    location: 'Engineering Building, Room 301',
    category: 'Technology',
    attendees: 45,
    hasLocation: true,
    image: careerFairExhibitionHall,
    description:
      'Join us for an exciting day of innovation and technology! This summit brings together students, faculty, and industry leaders to explore the latest trends in tech. Network with professionals, attend workshops, and discover opportunities in the tech industry.'
  },
  {
    id: 2,
    title: 'Campus Career Fair',
    date: 'Mar 18',
    dayOfWeek: 'Tuesday',
    time: '9:00 AM',
    location: null,
    category: 'Career',
    attendees: 0,
    hasLocation: false,
    image: '/career-fair-exhibition-hall.jpg',
    description:
      'Connect with top employers and explore career opportunities across various industries. Bring your resume and dress professionally for this excellent networking opportunity.'
  },
  {
    id: 3,
    title: 'Cultural Night: Celebrating Diversity',
    date: 'Mar 22',
    dayOfWeek: 'Saturday',
    time: '6:00 PM',
    location: 'Main Auditorium',
    category: 'Cultural',
    attendees: 180,
    hasLocation: true,
    image: '/cultural-performance-stage.png',
    description:
      'Experience the rich diversity of our campus community through music, dance, and cultural performances from around the world. Food from various cultures will be served.'
  },
  {
    id: 4,
    title: 'Startup Pitch Competition',
    date: 'Mar 25',
    dayOfWeek: 'Tuesday',
    time: '1:00 PM',
    location: 'Business School, Hall A',
    category: 'Business',
    attendees: 67,
    hasLocation: true,
    image: '/startup-pitch.png',
    description:
      'Watch aspiring entrepreneurs pitch their innovative business ideas to a panel of investors and industry experts. Cash prizes and mentorship opportunities available for winners.'
  },
  {
    id: 5,
    title: 'Environmental Awareness Workshop',
    date: 'Mar 28',
    dayOfWeek: 'Friday',
    time: '3:00 PM',
    location: null,
    category: 'Workshop',
    attendees: 0,
    hasLocation: false,
    image: '/environmental-workshop-classroom.jpg',
    description:
      'Learn about sustainable practices and how you can make a positive impact on the environment. Interactive sessions on recycling, conservation, and green technology.'
  },
  {
    id: 6,
    title: 'Music Festival: Spring Vibes',
    date: 'Apr 2',
    dayOfWeek: 'Wednesday',
    time: '5:00 PM',
    location: 'Campus Grounds',
    category: 'Entertainment',
    attendees: 450,
    hasLocation: true,
    image: '/outdoor-music-festival-concert.jpg',
    description:
      'Celebrate spring with live music performances from local bands and student artists. Food trucks, games, and activities for everyone. Bring your friends and enjoy the outdoors!'
  }
];

// Sample past event data
export const pastEvents = [
  {
    id: 1,
    title: 'Winter Hackathon 2024',
    date: 'Feb 10',
    dayOfWeek: 'Saturday',
    time: '9:00 AM',
    location: 'Computer Science Building',
    category: 'Technology',
    attendees: 120,
    hasLocation: true,
    image: '/hackathon-event.png',
    description:
      'A 24-hour coding marathon where students built innovative solutions to real-world problems. Teams competed for prizes and mentorship opportunities from industry professionals.'
  },
  {
    id: 2,
    title: 'Alumni Networking Night',
    date: 'Jan 28',
    dayOfWeek: 'Sunday',
    time: '6:00 PM',
    location: 'Grand Hall',
    category: 'Career',
    attendees: 85,
    hasLocation: true,
    image: '/networking-connections.png',
    description:
      'An evening of networking with successful alumni from various industries. Students had the opportunity to learn about career paths and make valuable connections.'
  },
  {
    id: 3,
    title: 'New Year Celebration',
    date: 'Jan 1',
    dayOfWeek: 'Monday',
    time: '8:00 PM',
    location: 'Campus Grounds',
    category: 'Entertainment',
    attendees: 500,
    hasLocation: true,
    image: '/vibrant-city-celebration.png',
    description:
      'A spectacular celebration to welcome the new year with live music, fireworks, and festivities. The entire campus community came together for this memorable event.'
  }
];

export const attendanceData = [
  {
    id: '2021-00001',
    name: 'Juan Dela Cruz',
    email: 'jdelacruz@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:30 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 05:00 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00002',
    name: 'Maria Santos',
    email: 'msantos@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:45 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:30 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00003',
    name: 'Pedro Reyes',
    email: 'preyes@umindanao.edu.ph',
    checkInAt: '2024-10-14 09:00 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:15 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00004',
    name: 'Ana Garcia',
    email: 'agarcia@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:15 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:45 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00005',
    name: 'Carlos Mendoza',
    email: 'cmendoza@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:50 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:30 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00006',
    name: 'Sofia Rodriguez',
    email: 'srodriguez@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:20 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:50 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00007',
    name: 'Miguel Torres',
    email: 'mtorres@umindanao.edu.ph',
    checkInAt: '2024-10-14 09:10 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:20 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00008',
    name: 'Isabella Cruz',
    email: 'icruz@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:35 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:55 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00009',
    name: 'Diego Fernandez',
    email: 'dfernandez@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:55 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:25 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00010',
    name: 'Lucia Martinez',
    email: 'lmartinez@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:25 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:40 PM',
    checkOutBy: 'Admin User'
  },
  {
    id: '2021-00011',
    name: 'Roberto Gonzales',
    email: 'rgonzales@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:40 AM',
    checkInBy: 'Self Check-in',
    checkOutAt: '2024-10-14 05:10 PM',
    checkOutBy: 'Self Check-out'
  },
  {
    id: '2021-00012',
    name: 'Carmen Lopez',
    email: 'clopez@umindanao.edu.ph',
    checkInAt: '2024-10-14 08:55 AM',
    checkInBy: 'Admin User',
    checkOutAt: '2024-10-14 04:35 PM',
    checkOutBy: 'Admin User'
  }
];
