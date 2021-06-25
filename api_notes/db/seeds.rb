# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

notes = Note.create(
  [
    {
      title: "IdeaFix",
      description: "Empresa Inteligente"
    },
    {
      title: "IndicaFix",
      description: "Plataforma de pesquisa que gera resultados"
    },
    {
      title: "Vaga Desenvolvedor",
      description: "Profissional Fulltask para colaborar em projeto Ruby on Rails"
    }
  ])