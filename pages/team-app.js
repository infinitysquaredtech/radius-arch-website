class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error(
      "ErrorBoundary caught an error:",
      error,
      errorInfo.componentStack,
    );
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Something went wrong</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const MEN_PLACEHOLDER = "assets/team/men-placeholder.jpg";
const WOMEN_PLACEHOLDER = "assets/team/women-placeholder.jpg";

// Women's first names that can appear without a Mr./Mrs./Ms. honorific
// (e.g. "Ar. Richa Goyal"), so the women placeholder is still picked.
const FEMALE_FIRST_NAMES = ["richa", "kirti", "trupti", "darshana", "gargi"];

function getMemberImage(member) {
  if (member.image) return member.image;

  if (/^\s*(mrs|ms|miss)\.?\s/i.test(member.name)) return WOMEN_PLACEHOLDER;
  if (/^\s*mr\.?\s/i.test(member.name)) return MEN_PLACEHOLDER;

  const firstName = member.name
    .split(/\s+/)
    .find((part) => !/^[A-Za-z]+\.$/.test(part));

  return FEMALE_FIRST_NAMES.includes((firstName || "").toLowerCase())
    ? WOMEN_PLACEHOLDER
    : MEN_PLACEHOLDER;
}

function TeamPage() {
  try {
    const leadership = [
      {
        name: "Mr. Tejas Shah",
        title: "Principal Engineer & Senior Consultant",
        image: "assets/team/tejas_shah.webp",
        degree: "B.E. Construction",
        experience: "25+ years",
      },
      {
        name: "Mrs. Gargi Denge Shah",
        title: "Company Owner",
        image: "",
        degree: "B.A.",
        experience: "25+ years",
      },
    ];

    const team = [
      { name: "Ar. Nitin Tombhare", title: "Associate Architect", image: "" },
      { name: "Ar. Jayendra Patel", title: "Associate Architect", image: "" },
      { name: "Ar. Richa Goyal", title: "Associate Architect", image: "" },
      { name: "Ar. Nitin Vora", title: "Senior Architect", image: "" },
      { name: "Ar. Dilip Kadam", title: "Senior Architect", image: "" },
      { name: "Mr. Sandesh Kadam", title: "Draftsmen", image: "" },
      { name: "Mrs. Trupti Gurav", title: "Draftsmen", image: "" },
      { name: "Mr. Kumar Patil", title: "Draftsmen", image: "" },
      { name: "Mr. Jignesh Gondaliya", title: "Liasoning Personal", image: "" },
      { name: "Mr. Varun Desai", title: "Liasoning Personal", image: "" },
      { name: "Mr. Sandesh Patil", title: "Liasoning Personal", image: "" },
      { name: "Mr. Dhananjay Gurkhe", title: "Liasoning Personal", image: "" },
      {
        name: "Mr. Prakash Patil",
        title: "Site Engineer/Supervisor",
        image: "",
      },
      {
        name: "Mr. Santosh More",
        title: "Site Engineer/Supervisor",
        image: "",
      },
      { name: "Mr. Nikhil Salian", title: "Legal Associate", image: "" },
      { name: "Ms. Kirti Nagda", title: "Legal Associate", image: "" },
      { name: "Mr. Rajesh Sharma", title: "Legal Associate", image: "" },
      { name: "Mr. Rajesh Sharma", title: "Legal Associate", image: "" },
      { name: "Mr. Pal Ajay Singh", title: "Structural Associate", image: "" },
      { name: "Evolute Team", title: "Structural Associates", image: "" },
      { name: "Madan Dedhia & Co.", title: "Chartered Accountants", image: "" },
      {
        name: "Mohd. Shahid & Associates",
        title: "Chartered Accountants",
        image: "",
      },
      { name: "Mr. Vishal Parekh", title: "Business Development", image: "" },
      { name: "Mrs. Darshana Gawade", title: "Office Admin Staff", image: "" },
      { name: "Mr. Rohit Salvi", title: "Office Admin Staff", image: "" },
      { name: "Mr. Vaishnav Gurav", title: "Office Admin Staff", image: "" },
    ];

    return (
      <div data-name="team-page" data-file="team-app.js">
        <Header />
        <section className="py-20 bg-gray-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-36">
            <h1 className="text-5xl text-center text-[var(--primary-color)] mb-16">
              Our Team
            </h1>

            <div className="mb-16">
              <h2 className="text-3xl text-center text-[var(--primary-color)] mb-8">
                Leadership
              </h2>
              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {leadership.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg overflow-hidden shadow-md text-center p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  >
                    <img
                      src={getMemberImage(member)}
                      alt={member.name}
                      className="w-80 h-80 rounded-3xl mx-auto mb-6 object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <h3 className="text-3xl font-bold text-[var(--primary-color)] mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg text-[var(--secondary-color)] font-semibold mb-4">
                      {member.title}
                    </p>
                    <div className="text-base text-[var(--text-secondary)]">
                      <p>{member.degree}</p>
                      <p>{member.experience} experience</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl text-center text-[var(--primary-color)] mb-8">
                Team Members
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {team.map((member, idx) => (
                  <div
                    key={idx}
                    className="text-center transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative group mb-4">
                      <img
                        src={getMemberImage(member)}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover transition-transform duration-300 group-hover:scale-110 shadow-md"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-base font-bold text-[var(--primary-color)] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {member.title}
                    </p>
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
    console.error("TeamPage error:", error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <TeamPage />
  </ErrorBoundary>,
);
