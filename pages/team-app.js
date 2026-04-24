class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return <div className="min-h-screen flex items-center justify-center"><p>Something went wrong</p></div>;
    }
    return this.props.children;
  }
}

function TeamPage() {
  try {
    const leadership = [
      {
        name: 'Mr. Tejas Shah',
        title: 'Principal Engineer & Senior Consultant',
        image: 'assets/team/tejas_shah.webp',
        degree: 'B.E. Construction',
        experience: '25+ years'
      },
      {
        name: 'Mrs. Gargi Denge Shah',
        title: 'Company Owner',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        degree: 'B.A.',
        experience: '25+ years'
      }
    ];

    const team = [
      { name: 'Ar. Nitin Tombhare', title: 'Associate Architect', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
      { name: 'Ar. Jayendra Patel', title: 'Associate Architect', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80' },
      { name: 'Ar. Richa Goyal', title: 'Associate Architect', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
      { name: 'Ar. Nitin Vora', title: 'Senior Architect', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
      { name: 'Ar. Dilip Kadam', title: 'Senior Architect', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
      { name: 'Mr. Sandesh Kadam', title: 'Draftsmen', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
      { name: 'Mrs. Trupti Gurav', title: 'Draftsmen', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
      { name: 'Mr. Kumar Patil', title: 'Draftsmen', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80' },
      { name: 'Mr. Jignesh Gondaliya', title: 'Licensing Personal', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
      { name: 'Mr. Varun Desai', title: 'Licensing Personal', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80' },
      { name: 'Mr. Sandesh Patil', title: 'Licensing Personal', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80' },
      { name: 'Mr. Dhananjay Gurkhe', title: 'Licensing Personal', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' },
      { name: 'Mr. Prakash Patil', title: 'Site Engineer/Supervisor', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80' },
      { name: 'Mr. Santosh More', title: 'Site Engineer/Supervisor', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80' },
      { name: 'Mr. Nikhil Salian', title: 'Legal Associate', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=80' },
      { name: 'Ms. Kirti Nagda', title: 'Legal Associate', image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&q=80' },
      { name: 'Mr. Rajesh Sharma', title: 'Legal Associate', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80' },
      { name: 'Mr. Rajesh Sharma', title: 'Legal Associate', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80' },
      { name: 'Mr. Pal Ajay Singh', title: 'Structural Associate', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80' },
      { name: 'Evolute Team', title: 'Structural Associates', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
      { name: 'Madan Dedhia & Co.', title: 'Chartered Accountants', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
      { name: 'Mohd. Shahid & Associates', title: 'Chartered Accountants', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80' },
      { name: 'Mr. Vishal Parekh', title: 'Business Development', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80' },
      { name: 'Mrs. Darshana Gawade', title: 'Office Admin Staff', image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&q=80' },
      { name: 'Mr. Rohit Salvi', title: 'Office Admin Staff', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80' },
      { name: 'Mr. Vaishnav Gurav', title: 'Office Admin Staff', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80' }
    ];

    return (
      <div data-name="team-page" data-file="team-app.js">
        <Header />
        <section className="py-20 bg-gray-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-36">
            <h1 className="text-5xl text-center text-[var(--primary-color)] mb-16">Our Team</h1>
            
            <div className="mb-16">
              <h2 className="text-3xl text-center text-[var(--primary-color)] mb-8">Leadership</h2>
              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {leadership.map((member, idx) => (
                  <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md text-center p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <img src={member.image} alt={member.name} className="w-80 h-80 rounded-3xl mx-auto mb-6 object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                    <h3 className="text-3xl font-bold text-[var(--primary-color)] mb-2">{member.name}</h3>
                    <p className="text-lg text-[var(--secondary-color)] font-semibold mb-4">{member.title}</p>
                    <div className="text-base text-[var(--text-secondary)]">
                      <p>{member.degree}</p>
                      <p>{member.experience} experience</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl text-center text-[var(--primary-color)] mb-8">Team Members</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {team.map((member, idx) => (
                  <div key={idx} className="text-center transition-all duration-300 hover:-translate-y-2">
                    <div className="relative group mb-4">
                      <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto object-cover transition-transform duration-300 group-hover:scale-110 shadow-md" loading="lazy" />
                    </div>
                    <h3 className="text-base font-bold text-[var(--primary-color)] mb-1">{member.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{member.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <ContactForm />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('TeamPage error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><TeamPage /></ErrorBoundary>);