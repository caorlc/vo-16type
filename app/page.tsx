import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Brain, Target, Star } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import StructuredData from "./structured-data"
// @ts-ignore
import homepageContent from "../homepage-content.json"

const featureIcons: Record<string, React.ElementType> = {
  Brain,
  Users,
  Target,
  Star,
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <nav aria-label="パンくずリスト" className="sr-only">
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href="/">
              <span itemProp="name">ホーム</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
        </ol>
      </nav>
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section - H1 */}
      <section className="py-20 px-4" aria-labelledby="hero-heading">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 id="hero-heading" className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {homepageContent.hero.title.replace(homepageContent.hero.highlight, "")}
              <span className="text-orange-500">{homepageContent.hero.highlight}</span>
              {homepageContent.hero.title.split(homepageContent.hero.highlight)[1] || ""}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed" style={{whiteSpace: 'pre-line'}}>
              {homepageContent.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              <Link href="/test" className="flex items-center">
                {homepageContent.hero.startButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
              <p className="text-sm text-gray-500">{homepageContent.hero.timeInfo}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 16タイプ紹介セクション - H2 */}
      <section className="py-20 bg-gray-50" aria-labelledby="types-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <h2 id="types-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {homepageContent.typesSection.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {homepageContent.typesSection.subtitle}
            </p>
          </header>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" role="list" aria-label="16タイプの性格タイプ一覧">
            {homepageContent.typesSection.types.map((type: any) => (
              <article key={type.id} className="card" role="listitem">
                <Link href={`/personality/${type.id.toLowerCase()}`} className="block group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl">
                  <Card className="group-hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2 flex flex-col items-center">
                      <div className="flex items-center justify-between">
                        <Badge className={type.color}>{type.id}</Badge>
                      </div>
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                      <CardDescription className="text-sm">{type.description}</CardDescription>
                      <div className="h-20 w-full flex items-center justify-center">
                        <Image
                          src={`/images/${type.id.toLowerCase()}.png`}
                          alt={`${type.id}（${type.name}）の16タイプ性格診断結果画像`}
                          width={72}
                          height={72}
                          className="bg-white p-2 rounded-full object-contain"
                          style={{objectPosition: 'center'}}
                          priority={type.id === 'INTJ' || type.id === 'INFP' || type.id === 'ENFJ' || type.id === 'ENTP'}
                        />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              <Link href="/personality">{homepageContent.typesSection.viewAllButton}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 16タイプ性格診断の特徴セクション - H2 */}
      <section className="py-20 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {homepageContent.featuresSection.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {homepageContent.featuresSection.subtitle}
            </p>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="16タイプ性格診断の特徴">
            {homepageContent.featuresSection.features.map((feature: any, index: number) => {
              const Icon = featureIcons[feature.icon];
              return (
                <article key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow" role="listitem">
                  <Card>
                    <CardHeader>
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {Icon && <Icon className="h-8 w-8 text-orange-500" />}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQセクション - H2 */}
      <section className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {homepageContent.faqSection.title}
            </h2>
          </header>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full bg-white rounded-lg shadow-sm">
              {homepageContent.faqSection.faqs.map((faq: any, idx: number) => (
                <AccordionItem value={`q${idx+1}`} key={idx}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTAセクション - H2 */}
      <section className="py-20 bg-orange-500" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-6">
              {homepageContent.ctaSection.title}
            </div>
            <div className="text-xl text-orange-100 mb-8">{homepageContent.ctaSection.subtitle}</div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              <Link href="/test" className="flex items-center">
                {homepageContent.ctaSection.button}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
