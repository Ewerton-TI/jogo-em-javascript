class Jogo {
  constructor() {
    this.indice = 0;
    
    this.mapa = fita.mapa;
  }

  setup() {
    vida = new Vida(fita.configuracoes.vidaMaxima,fita.configuracoes.vidaInicial);
    cenario = new Cenario(imagemCenario, 3);
    pontuacao = new Pontuacao();
    personagem = new Personagem(matrizPersonagem, imagemPersonagem, 0, 50, 110, 135, 220, 270);
    const inimigo = new Inimigo(matrizInimigo, imagemInimigo, width - 52, 52, 50, 52, 104, 104, 8);
    const inimigoVoador = new Inimigo(matrizInimigoVoador, imagemInimigoVoador, width - 52, 300, 100, 75, 200, 150, 8);
    const inimigoGrande = new Inimigo(matrizInimigoGrande, imagemInimigoGrande, width, 0, 200, 200, 400, 400, 15);

    inimigos.push(inimigo);
    inimigos.push(inimigoGrande);
    inimigos.push(inimigoVoador);
  }

  keyPressed(key) {
    if (key === 'ArrowUp') {
      personagem.pula();
      somDoPulo.play();
    }
  }
  draw() {
    cenario.exibe();
    cenario.move();

    vida.draw();
    personagem.exibe();
    personagem.aplicaGravidade();

    pontuacao.exibe();
    pontuacao.adicionarPonto();
    const linhaAtual = this.mapa[this.indice];
    const inimigo = inimigos[linhaAtual.inimigo];
    const inimigoVisivel = inimigo.x < -inimigo.largura;
      
    inimigo.velocidade = linhaAtual.velocidade;

    inimigo.exibe();
    inimigo.move();

    if (inimigoVisivel) {
      this.indice++;
      inimigo.aparece();
      if (this.indice > this.mapa.length - 1) {
        this.indice = 0;
      }

    }

    if (personagem.estaColidindo(inimigo)) {
      vida.perdeVida();
      personagem.tonarInvencivel();
      if(vida.vidas === 0){
      image(imagemGameOver, width / 2 - 200, height / 4);
      somDoJogo.stop();
      noLoop();
      }
    }
  }
}