import * as React from 'react';
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Code,
  Database,
  GitBranch,
  Globe,
  Lock,
  Package,
  Server,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="text-xl font-bold">OnlineSales</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#why" className="text-sm font-medium hover:underline underline-offset-4">
              Why OnlineSales
            </Link>
            <Link href="#compare" className="text-sm font-medium hover:underline underline-offset-4">
              Compare
            </Link>
            <Link href="#help" className="text-sm font-medium hover:underline underline-offset-4">
              Expert Help
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/onlinesales/onlinesales"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm font-medium"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
            </Link>
            <Button asChild>
              <Link href="#contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-background to-muted">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="flex flex-col items-start">
                <Badge className="mb-4" variant="outline">
                  Open Source
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  The Open‑Source Sales Automation & CMS for SaaS
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  Empower Your SaaS Growth with a Developer‑First Platform. Automate every step of the product sales
                  lifecycle.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button asChild size="lg">
                    <Link href="#contact">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="https://github.com/onlinesales/onlinesales" target="_blank" rel="noopener noreferrer">
                      <GitBranch className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-muted rounded-t-lg flex items-center gap-2 px-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-xs text-muted-foreground ml-2">OnlineSales Dashboard</div>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-2 p-2">
                    <div className="col-span-2 h-40 rounded-md bg-muted"></div>
                    <div className="h-40 rounded-md bg-muted"></div>
                    <div className="h-20 rounded-md bg-muted"></div>
                    <div className="col-span-2 h-20 rounded-md bg-muted"></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full z-[-1]"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full z-[-1]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Platform Section */}
        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">One Unified Platform</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for developers and tech‑savvy teams, OnlineSales unifies everything you need to grow your SaaS
                business.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="relative overflow-hidden border-2 border-primary/20">
                <div className="absolute top-0 right-0 p-2 bg-primary/10 rounded-bl-lg">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardHeader className="pt-12">
                  <CardTitle>Headless CMS</CardTitle>
                  <CardDescription>
                    Structure and publish content with full version control. Perfect for product pages and
                    documentation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Git-based content management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Structured content models</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>API-first architecture</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-2 border-primary/20">
                <div className="absolute top-0 right-0 p-2 bg-primary/10 rounded-bl-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardHeader className="pt-12">
                  <CardTitle>CRM for SaaS</CardTitle>
                  <CardDescription>
                    Track the entire customer journey from first click to conversion and beyond.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Contact and deal management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Customer journey tracking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Sales pipeline visualization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-2 border-primary/20">
                <div className="absolute top-0 right-0 p-2 bg-primary/10 rounded-bl-lg">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardHeader className="pt-12">
                  <CardTitle>Automated Licensing</CardTitle>
                  <CardDescription>
                    Provision free trials and manage recurring subscriptions with zero friction.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>License key generation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Trial management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Subscription tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why OnlineSales Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="why">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why OnlineSales?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Built with developers in mind, OnlineSales gives you complete control over your sales and content
                platform.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <div className="bg-background rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% Open Source</h3>
                <p className="text-muted-foreground">
                  Available on GitHub under the MIT license for full code ownership and transparency. No vendor lock‑in
                  or hidden costs.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Self‑Hosted or Cloud</h3>
                <p className="text-muted-foreground">
                  Docker‑ready for fast, flexible deployment anywhere: your private cloud, on‑premises, or a managed
                  host.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Developer‑First Workflow</h3>
                <p className="text-muted-foreground">
                  Use Git to version content changes, integrate with CI/CD, and extend via plugins or direct source code
                  edits.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Modular Architecture</h3>
                <p className="text-muted-foreground">
                  Pick only the features you need. Add new plugins for custom functionality or integrations anytime.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Built‑In Licensing</h3>
                <p className="text-muted-foreground">
                  Automatically provision free trials and manage recurring subscriptions. Generate and validate license
                  keys with zero friction.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">API-First Design</h3>
                <p className="text-muted-foreground">
                  Comprehensive API endpoints for seamless integration with your existing tools and workflows. Build custom solutions with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Deploy in Seconds</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Get up and running with a single command. No complex setup required.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-black rounded-lg overflow-hidden shadow-xl relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full z-[-1]"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full z-[-1]"></div>

                <div className="flex items-center h-8 bg-gray-800 px-4">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-2 text-xs text-gray-400">terminal</div>
                </div>
                <div className="p-4 md:p-8 overflow-x-auto">
                  <pre className="text-green-400 font-mono text-sm md:text-base whitespace-pre-wrap break-all">
                    <span className="text-blue-400">$</span> docker run -p 8080:80 onlinesales/platform:latest
                  </pre>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 mt-12">
                <div className="bg-background rounded-xl p-8 shadow-sm border text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Built on .NET 7 for high performance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Containerized with Docker for consistent deployment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">PostgreSQL database for reliable data storage</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">RESTful API with OpenAPI documentation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-background rounded-xl p-8 shadow-sm border text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Developer Experience</h3>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Comprehensive API for custom integrations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Plugin system for extending functionality</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Webhooks for real-time event notifications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Detailed documentation and examples</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button asChild size="lg">
                  <Link href="https://docs.onlinesales.dev/getting-started" target="_blank" rel="noopener noreferrer">
                    View Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Help Section */}
        <section className="w-full py-12 md:py-24 lg:py-32" id="help">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get Expert Help When You Need It</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Whether you're launching an MVP or scaling a mature product, our team stands by to help you get
                  started.
                </p>
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Professional Setup</h3>
                      <p className="text-muted-foreground">
                        We can guide you through installation or handle the entire process, ensuring a smooth launch.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Custom Development</h3>
                      <p className="text-muted-foreground">
                        Need a specialized workflow or integration? Our experts can tailor the platform to your unique
                        requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Ongoing Support</h3>
                      <p className="text-muted-foreground">
                        From performance tuning to updates, we're here to back your team with expert assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-xl p-8 shadow-sm border">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Services Include:</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                    <span>Professional installation and setup</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                    <span>Custom development and integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                    <span>Training and onboarding</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                    <span>Ongoing maintenance and support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                    <span>Performance optimization</span>
                  </li>
                </ul>
                <Button asChild className="w-full mt-8">
                  <Link href="#contact-form">Contact Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to automate your SaaS sales and content management.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <div className="bg-background rounded-xl p-8 shadow-sm border text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Unified Dashboard</h3>
                <p className="text-muted-foreground">
                  Track site traffic, lead generation, and sales performance at a glance. Consolidate vital metrics in
                  one place.
                </p>
              </div>
              <div className="bg-background rounded-xl p-8 shadow-sm border text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Headless CMS with Git Sync</h3>
                <p className="text-muted-foreground">
                  Structure and publish content with your favorite editor. Push changes to a Git repo for full version
                  control.
                </p>
              </div>
              <div className="bg-background rounded-xl p-8 shadow-sm border text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">CRM Built for SaaS</h3>
                <p className="text-muted-foreground">
                  Manage contacts, deals, and domains while tracking the entire customer journey from first click to
                  conversion.
                </p>
              </div>
              <div className="bg-background rounded-xl p-8 shadow-sm border text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sales Automation</h3>
                <p className="text-muted-foreground">
                  Trigger email sequences, license activations, or upsell offers instantly based on user behavior.
                </p>
              </div>
              <div className="bg-background rounded-xl p-8 shadow-sm border text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure & Compliant</h3>
                <p className="text-muted-foreground">
                  Deploy it behind your firewall. Your data, your rules — ensuring compliance with GDPR or other privacy
                  standards.
                </p>
              </div>
              <div className="bg-background rounded-xl p-8 shadow-sm border text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fast. Flexible. Scalable.</h3>
                <p className="text-muted-foreground">
                  Powered by .NET 7 for high-performance and robust tooling for enterprise workloads. Containerized
                  deployment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="w-full py-12 md:py-24 lg:py-32" id="compare">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How OnlineSales Compares</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Unlike proprietary solutions, OnlineSales gives you complete control over your platform.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="control">Control</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="p-6 border rounded-lg bg-background">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 gap-4 font-medium">
                      <div></div>
                      <div className="text-center">OnlineSales</div>
                      <div className="text-center">HubSpot</div>
                      <div className="text-center">Salesforce</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>CMS</div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>CRM</div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Licensing</div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                      <div className="text-center text-red-500">Limited</div>
                      <div className="text-center text-red-500">Limited</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Self-Hosted</div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                      <div className="text-center text-red-500">No</div>
                      <div className="text-center text-red-500">No</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Open Source</div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                      <div className="text-center text-red-500">No</div>
                      <div className="text-center text-red-500">No</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="pricing" className="p-6 border rounded-lg bg-background">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 gap-4 font-medium">
                      <div></div>
                      <div className="text-center">OnlineSales</div>
                      <div className="text-center">HubSpot</div>
                      <div className="text-center">Salesforce</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Per-User Fees</div>
                      <div className="text-center text-green-500">No</div>
                      <div className="text-center text-red-500">Yes</div>
                      <div className="text-center text-red-500">Yes</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Feature Lockouts</div>
                      <div className="text-center text-green-500">No</div>
                      <div className="text-center text-red-500">Yes</div>
                      <div className="text-center text-red-500">Yes</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>One-time Cost</div>
                      <div className="text-center text-green-500">Optional</div>
                      <div className="text-center text-red-500">No</div>
                      <div className="text-center text-red-500">No</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Subscription</div>
                      <div className="text-center">Optional Support</div>
                      <div className="text-center">Required</div>
                      <div className="text-center">Required</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="control" className="p-6 border rounded-lg bg-background">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 gap-4 font-medium">
                      <div></div>
                      <div className="text-center">OnlineSales</div>
                      <div className="text-center">HubSpot</div>
                      <div className="text-center">Salesforce</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Source Code Access</div>
                      <div className="text-center text-green-500">
                        <CheckCircle className="mx-auto h-5 w-5" />
                      </div>
                      <div className="text-center text-red-500">No</div>
                      <div className="text-center text-red-500">No</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Custom Extensions</div>
                      <div className="text-center text-green-500">Unlimited</div>
                      <div className="text-center">Limited</div>
                      <div className="text-center">Limited</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Data Ownership</div>
                      <div className="text-center text-green-500">100%</div>
                      <div className="text-center">Shared</div>
                      <div className="text-center">Shared</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center border-t pt-4">
                      <div>Deployment Control</div>
                      <div className="text-center text-green-500">Complete</div>
                      <div className="text-center text-red-500">None</div>
                      <div className="text-center text-red-500">Limited</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground" id="contact">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
            <p className="mt-6 text-xl max-w-2xl mx-auto">
              Join the growing community of SaaS teams who trust OnlineSales for their entire product sales lifecycle.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Button asChild size="lg" variant="secondary">
                <Link href="https://github.com/onlinesales/onlinesales" target="_blank" rel="noopener noreferrer">
                  <GitBranch className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#contact-form">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="w-full py-12 md:py-24 lg:py-32" id="contact-form">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-12 md:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter">Get Professional Assistance</h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Whether you need help with setup, custom integration, or ongoing support, our team is here to help.
                  </p>
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Our Services Include:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                        <span>Professional installation and setup</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                        <span>Custom development and integrations</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                        <span>Training and onboarding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                        <span>Ongoing maintenance and support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                        <span>Performance optimization</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="first-name" className="text-sm font-medium leading-none">
                            First name
                          </label>
                          <input
                            id="first-name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="last-name" className="text-sm font-medium leading-none">
                            Last name
                          </label>
                          <input
                            id="last-name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium leading-none">
                          Company
                        </label>
                        <input
                          id="company"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium leading-none">
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your message"
                          required
                        ></textarea>
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-3xl mx-auto">
              OnlineSales – Build faster. Sell smarter. Own your platform.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              The open-source solution for automating every step of your SaaS product sales lifecycle.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Button asChild size="lg">
                <Link href="#contact">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://github.com/onlinesales/onlinesales" target="_blank" rel="noopener noreferrer">
                  <GitBranch className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-8">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} OnlineSales. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-6">
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">
                Docs
              </Link>
              <Link
                href="https://github.com/onlinesales/onlinesales"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
              >
                GitHub
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}