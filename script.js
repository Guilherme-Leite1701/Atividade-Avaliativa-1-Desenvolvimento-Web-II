// Exercicio 1
function ex1() {
    let precoCombustivel = parseFloat(prompt("Preço do litro do combustível:"));
    let totalPedidos = 0;
    let somaTotal = 0;
    let reg1 = 0, reg2 = 0, reg3 = 0;
    let maiorValor = 0, codMaior = "";
    let menorValor = 9999999, codMenor = "";

    let continuar = true;
    while (continuar) {
        let cod = prompt("Código do pedido:");
        
        let regiao = parseInt(prompt("Região (1-Sudeste, 2-Sul, 3-Centro-Oeste):"));
        while (regiao != 1 && regiao != 2 && regiao != 3) {
            regiao = parseInt(prompt("Inválido! Região (1, 2 ou 3):"));
        }

        let dist = parseFloat(prompt("Distância em km:"));
        let qtd = parseInt(prompt("Quantidade de peças:"));
        let rast = prompt("Deseja rastreamento? (S/N):");

        let precoPeca = 0;
        switch(regiao) {
            case 1: precoPeca = 1.20; break;
            case 2: precoPeca = 1.30; break;
            case 3: precoPeca = 1.50; break;
        }

        let custoPecas = 0;
        if (qtd > 1000) {
            let exc = qtd - 1000;
            custoPecas = (1000 * precoPeca) + (exc * precoPeca * 0.88);
        } else {
            custoPecas = qtd * precoPeca;
        }

        let custoFrete = dist * precoCombustivel;
        let custoRast = 0;
        if (rast == 'S' || rast == 's') {
            custoRast = 200;
        }

        let total = custoPecas + custoFrete + custoRast;

        totalPedidos++;
        somaTotal += total;

        if (regiao == 1) reg1 += total;
        if (regiao == 2) reg2 += total;
        if (regiao == 3) reg3 += total;

        if (total > maiorValor) { maiorValor = total; codMaior = cod; }
        if (total < menorValor) { menorValor = total; codMenor = cod; }

        let resp = prompt("Continuar? (S/N)");
        if (resp == 'N' || resp == 'n') continuar = false;
    }

    let relatorio = "--- RELATÓRIO EX 1 ---\n";
    relatorio += "Total de pedidos: " + totalPedidos + "\n";
    relatorio += "Valor médio por pedido: R$ " + (totalPedidos>0?somaTotal/totalPedidos:0).toFixed(2) + "\n";
    relatorio += "Acumulado Região 1 (Sudeste): R$ " + reg1.toFixed(2) + "\n";
    relatorio += "Acumulado Região 2 (Sul): R$ " + reg2.toFixed(2) + "\n";
    relatorio += "Acumulado Região 3 (C. Oeste): R$ " + reg3.toFixed(2) + "\n";
    relatorio += "Mais caro: " + codMaior + " (R$ " + maiorValor.toFixed(2) + ")\n";
    relatorio += "Mais barato: " + codMenor + " (R$ " + menorValor.toFixed(2) + ")\n";

    alert(relatorio);
}

// Exercicio 2
function ex2() {
    let salarioMinimo = parseFloat(prompt("Salário mínimo atual:"));
    
    let totalFuncionarios = 0;
    let somaGeral = 0;
    let somaF = 0, qtdF = 0;
    let somaG = 0, qtdG = 0;
    let maiorSalario = 0, codMaior = "", catMaior = "", turnoMaior = "";
    let menorSalario = 9999999, codMenor = "", catMenor = "", turnoMenor = "";
    let b10 = 0, b5 = 0, b2 = 0, b0 = 0;

    let continuar = true;
    while (continuar) {
        let codigo = prompt("Código:");
        let horas = parseFloat(prompt("Horas trabalhadas:"));
        let categoria = prompt("Categoria (F/G):");
        let turno = prompt("Turno (M/V/N):");
        let nota = parseFloat(prompt("Nota de desempenho (0 a 10):"));

        let percHora = 0;
        if (categoria == 'F' && turno == 'M') percHora = 0.10;
        else if (categoria == 'F' && turno == 'V') percHora = 0.15;
        else if (categoria == 'F' && turno == 'N') percHora = 0.20;
        else if (categoria == 'G' && turno == 'M') percHora = 0.30;
        else if (categoria == 'G' && turno == 'V') percHora = 0.35;
        else if (categoria == 'G' && turno == 'N') percHora = 0.40;

        let salarioInicial = horas * (salarioMinimo * percHora);

        let auxilio = 0;
        if (salarioInicial <= 800) auxilio = salarioInicial * 0.25;
        else if (salarioInicial <= 1200) auxilio = salarioInicial * 0.20;
        else auxilio = salarioInicial * 0.15;

        let bonus = 0;
        if (nota >= 9) { bonus = salarioInicial * 0.10; b10++; }
        else if (nota >= 7) { bonus = salarioInicial * 0.05; b5++; }
        else if (nota >= 5) { bonus = salarioInicial * 0.02; b2++; }
        else { b0++; }

        let salarioFinal = salarioInicial + auxilio + bonus;

        totalFuncionarios++;
        somaGeral += salarioFinal;
        
        if (categoria == 'F') { somaF += salarioFinal; qtdF++; }
        if (categoria == 'G') { somaG += salarioFinal; qtdG++; }

        if (salarioFinal > maiorSalario) {
            maiorSalario = salarioFinal; codMaior = codigo; catMaior = categoria; turnoMaior = turno;
        }
        if (salarioFinal < menorSalario) {
            menorSalario = salarioFinal; codMenor = codigo; catMenor = categoria; turnoMenor = turno;
        }

        let resp = prompt("Deseja cadastrar outro? (S/N)");
        if (resp == 'N' || resp == 'n') continuar = false;
    }

    let mediaGeral = somaGeral / totalFuncionarios;
    let mediaF = qtdF > 0 ? somaF / qtdF : 0;
    let mediaG = qtdG > 0 ? somaG / qtdG : 0;

    let relatorio = "--- RELATÓRIO EX 2 ---\n";
    relatorio += "Total Funcionários: " + totalFuncionarios + "\n";
    relatorio += "Média Geral: R$ " + (totalFuncionarios>0?mediaGeral:0).toFixed(2) + "\n";
    relatorio += "Média F: R$ " + mediaF.toFixed(2) + "\n";
    relatorio += "Média G: R$ " + mediaG.toFixed(2) + "\n";
    relatorio += "Maior Salário: " + codMaior + " (" + catMaior + " - " + turnoMaior + ") R$ " + maiorSalario.toFixed(2) + "\n";
    relatorio += "Menor Salário: " + codMenor + " (" + catMenor + " - " + turnoMenor + ") R$ " + menorSalario.toFixed(2) + "\n";
    relatorio += "Bônus -> 10%: " + b10 + " | 5%: " + b5 + " | 2%: " + b2 + " | Nenhum: " + b0;

    alert(relatorio);
}

// Exercicio 3
function ex3() {
    let totalOrdens = 0;
    let est1 = 0, est2 = 0, est3 = 0;
    let somaCusto = 0;
    let maiorCusto = 0, codMaior = "";
    let menorCusto = 9999999, codMenor = "";
    let alertasAlto = 0, alertasCritico = 0;
    let produtosEstoque = {};
    let produtosCusto = {};

    let continuar = true;
    while (continuar) {
        let codOrdem = prompt("Código da ordem:");
        let codProduto = prompt("Código do produto:");
        
        let tipo = parseInt(prompt("Tipo (1-Padrão, 2-Premium, 3-Sob encomenda):"));
        while (tipo != 1 && tipo != 2 && tipo != 3) {
            tipo = parseInt(prompt("Inválido! Tipo (1, 2 ou 3):"));
        }

        let qtd = parseInt(prompt("Quantidade:"));
        let custo = parseFloat(prompt("Custo unitário:"));
        let estInicial = parseInt(prompt("Estoque inicial:"));

        let estFinal = estInicial + qtd;

        let ajuste = 0;
        if (tipo == 2) ajuste = 0.10;
        if (tipo == 3) ajuste = 0.20;

        let custoTotal = qtd * (custo + (custo * ajuste));

        if (estFinal > 5000) alertasAlto++;
        if (estFinal < 500) alertasCritico++;

        totalOrdens++;
        somaCusto += custoTotal;
        
        if (tipo == 1) est1 += estFinal;
        if (tipo == 2) est2 += estFinal;
        if (tipo == 3) est3 += estFinal;

        if (custoTotal > maiorCusto) { maiorCusto = custoTotal; codMaior = codOrdem; }
        if (custoTotal < menorCusto) { menorCusto = custoTotal; codMenor = codOrdem; }

        produtosEstoque[codProduto] = estFinal;
        if (produtosCusto[codProduto] == undefined) produtosCusto[codProduto] = 0;
        produtosCusto[codProduto] += custoTotal;

        let resp = prompt("Deseja continuar? (S/N)");
        if (resp == 'N' || resp == 'n') continuar = false;
    }

    let relatorio = "--- RELATÓRIO EX 3 ---\n";
    relatorio += "Total de ordens: " + totalOrdens + "\n";
    relatorio += "Estoque final -> Tipo 1: " + est1 + " | Tipo 2: " + est2 + " | Tipo 3: " + est3 + "\n";
    relatorio += "Média de custo total: R$ " + (totalOrdens>0?somaCusto/totalOrdens:0).toFixed(2) + "\n";
    relatorio += "Maior custo: Ordem " + codMaior + " (R$ " + maiorCusto.toFixed(2) + ")\n";
    relatorio += "Menor custo: Ordem " + codMenor + " (R$ " + menorCusto.toFixed(2) + ")\n";
    relatorio += "Alertas -> Alto: " + alertasAlto + " | Crítico: " + alertasCritico + "\n\nProdutos:\n";
    
    for (let p in produtosEstoque) {
        relatorio += "Prod " + p + " -> Est: " + produtosEstoque[p] + " | R$ " + produtosCusto[p].toFixed(2) + "\n";
    }
    
    alert(relatorio);
}

// Exercicio 4
function ex4() {
    let valorCafe = parseFloat(prompt("Valor do café da manhã (por pessoa/dia):"));
    let valorDiariaBase = parseFloat(prompt("Valor base da diária:"));

    let totalReservas = 0;
    let somaValor = 0;
    let valorS = 0, valorL = 0, valorP = 0;
    let valorB = 0, valorA = 0, valorF = 0;
    let maiorValor = 0, codMaior = "", infMaior = "";
    let menorValor = 9999999, codMenor = "", infMenor = "";
    let comCafe = 0, semCafe = 0;
    let ocupacaoTotal = 0, somaHospedes = 0;

    let continuar = true;
    while (continuar) {
        let cod = prompt("Código da reserva:");
        let tipo = prompt("Quarto (S-Standard, L-Luxo, P-Premium):");
        let temp = prompt("Temporada (B-Baixa, A-Alta, F-Feriado):");
        let dias = parseInt(prompt("Diárias:"));
        let hospedes = parseInt(prompt("Hóspedes:"));
        let cafe = prompt("Café da manhã incluso? (S/N):");

        let multTipo = 1;
        if (tipo == 'L') multTipo = 1.5;
        if (tipo == 'P') multTipo = 2.0;
        let diaria = valorDiariaBase * multTipo;

        let acrescimo = 0;
        if (temp == 'A') acrescimo = 0.25;
        if (temp == 'F') acrescimo = 0.40;
        diaria = diaria + (diaria * acrescimo);

        let cafeTotal = 0;
        if (cafe == 'S') {
            cafeTotal = valorCafe * hospedes * dias;
            comCafe++;
        } else {
            semCafe++;
        }

        let total = (diaria * dias) + cafeTotal;

        totalReservas++;
        somaValor += total;
        ocupacaoTotal += (dias * hospedes);
        somaHospedes += hospedes;

        if (tipo == 'S') valorS += total;
        if (tipo == 'L') valorL += total;
        if (tipo == 'P') valorP += total;

        if (temp == 'B') valorB += total;
        if (temp == 'A') valorA += total;
        if (temp == 'F') valorF += total;

        let info = tipo + ", " + temp + ", " + hospedes + " hosp.";
        if (total > maiorValor) { maiorValor = total; codMaior = cod; infMaior = info; }
        if (total < menorValor) { menorValor = total; codMenor = cod; infMenor = info; }

        let resp = prompt("Continuar? (S/N)");
        if (resp == 'N' || resp == 'n') continuar = false;
    }

    let relatorio = "--- RELATÓRIO EX 4 ---\n";
    relatorio += "Total reservas: " + totalReservas + "\n";
    relatorio += "Valor médio: R$ " + (totalReservas>0?somaValor/totalReservas:0).toFixed(2) + "\n";
    relatorio += "Quarto -> S: R$ " + valorS.toFixed(2) + " | L: R$ " + valorL.toFixed(2) + " | P: R$ " + valorP.toFixed(2) + "\n";
    relatorio += "Temp -> B: R$ " + valorB.toFixed(2) + " | A: R$ " + valorA.toFixed(2) + " | F: R$ " + valorF.toFixed(2) + "\n";
    relatorio += "Mais cara: " + codMaior + " (" + infMaior + ") R$ " + maiorValor.toFixed(2) + "\n";
    relatorio += "Mais barata: " + codMenor + " (" + infMenor + ") R$ " + menorValor.toFixed(2) + "\n";
    relatorio += "Reservas c/ café: " + comCafe + " | s/ café: " + semCafe + "\n";
    relatorio += "Ocupação: " + ocupacaoTotal + " | Médio por hóspede: R$ " + (somaHospedes>0?somaValor/somaHospedes:0).toFixed(2);

    alert(relatorio);
}

// Exercicio 5
function ex5() {
    let cargaMax = parseFloat(prompt("Carga máxima semanal (pontos):"));
    
    let totalTreinos = 0;
    let cargaJogadores = {};
    let treinosJogadores = {};
    let posJogadores = {};
    
    let somaF = 0, qtdF = 0;
    let somaT = 0, qtdT = 0;
    let somaE = 0, qtdE = 0;
    
    let qtdPos = {G: 0, Z: 0, M: 0, A: 0};
    let cargaPos = {G: 0, Z: 0, M: 0, A: 0};

    let continuar = true;
    while (continuar) {
        let cod = prompt("Código:");
        let nome = prompt("Nome do jogador:");
        let pos = prompt("Posição (G/Z/M/A):");
        let tipo = prompt("Tipo (F/T/E):");
        let duracao = parseInt(prompt("Duração (min):"));
        
        let intensidade = 0;
        while (intensidade < 1 || intensidade > 10) {
            intensidade = parseInt(prompt("Intensidade (1-10):"));
        }

        let mult = 1.0;
        if (tipo == 'F') mult = 1.5;
        if (tipo == 'T') mult = 1.2;

        let carga = (duracao / 10) * intensidade * mult;

        totalTreinos++;

        if (tipo == 'F') { somaF += carga; qtdF++; }
        if (tipo == 'T') { somaT += carga; qtdT++; }
        if (tipo == 'E') { somaE += carga; qtdE++; }

        if (qtdPos[pos] != undefined) {
            qtdPos[pos]++;
            cargaPos[pos] += carga;
        }

        if (cargaJogadores[nome] == undefined) {
            cargaJogadores[nome] = 0;
            treinosJogadores[nome] = 0;
        }
        cargaJogadores[nome] += carga;
        treinosJogadores[nome]++;
        posJogadores[nome] = pos;

        let resp = prompt("Continuar? (S/N)");
        if (resp == 'N' || resp == 'n') continuar = false;
    }

    let maiorCarga = 0, jogMaior = "";
    let menorCarga = 9999999, jogMenor = "";
    let riscoLesao = 0;
    let listaJog = "";

    for (let nome in cargaJogadores) {
        let c = cargaJogadores[nome];
        let t = treinosJogadores[nome];
        let p = posJogadores[nome];
        
        listaJog += "- " + nome + " (" + p + "): " + c.toFixed(1) + " pts (" + t + " treinos)\n";

        if (c > cargaMax) riscoLesao++;

        if (c > maiorCarga) { maiorCarga = c; jogMaior = nome + " (" + p + ", " + t + "t)"; }
        if (c < menorCarga) { menorCarga = c; jogMenor = nome + " (" + p + ", " + t + "t)"; }
    }

    let relatorio = "--- RELATÓRIO EX 5 ---\n";
    relatorio += "Total treinos: " + totalTreinos + "\n\n";
    relatorio += "Jogadores:\n" + listaJog + "\n";
    relatorio += "Maior carga: " + jogMaior + " (" + maiorCarga.toFixed(1) + ")\n";
    relatorio += "Menor carga: " + jogMenor + " (" + menorCarga.toFixed(1) + ")\n";
    relatorio += "Risco de lesão (> " + cargaMax + "): " + riscoLesao + "\n\n";
    relatorio += "Carga média por tipo -> F: " + (qtdF>0?somaF/qtdF:0).toFixed(1) + " | T: " + (qtdT>0?somaT/qtdT:0).toFixed(1) + " | E: " + (qtdE>0?somaE/qtdE:0).toFixed(1) + "\n\n";
    relatorio += "Por posição:\n";
    for (let p in qtdPos) {
        relatorio += p + ": " + qtdPos[p] + " treinos, Média: " + (qtdPos[p]>0?cargaPos[p]/qtdPos[p]:0).toFixed(1) + "\n";
    }

    alert(relatorio);
}

// Exercicio 6
function ex6() {
    let meta = parseFloat(prompt("Meta mensal (R$):"));
    let percBase = parseFloat(prompt("Comissão base (ex: 5 para 5%):")) / 100;

    let totalVendas = 0;
    let valorRegiao = {1:0, 2:0, 3:0, 4:0};
    let comissaoRegiao = {1:0, 2:0, 3:0, 4:0};
    let qtdRegiao = {1:0, 2:0, 3:0, 4:0};
    let valorPF = 0, valorPJ = 0;
    let somaComissoes = 0;
    
    let vendVenda = {};
    let vendComissao = {};

    let continuar = true;
    while (continuar) {
        let codVenda = prompt("Cód Venda:");
        let codVend = prompt("Cód Vendedor:");
        let reg = parseInt(prompt("Região (1 a 4):"));
        let valor = parseFloat(prompt("Valor da venda (R$):"));
        let tipoCli = prompt("Cliente (PF/PJ):");

        let comissao = valor * percBase;
        if (tipoCli == 'PF') comissao += valor * 0.02;
        if (tipoCli == 'PJ') comissao += valor * 0.03;

        if (reg == 1 || reg == 2) comissao += valor * 0.01;
        if (reg == 4) comissao += valor * 0.005;

        totalVendas++;
        if (valorRegiao[reg] != undefined) {
            valorRegiao[reg] += valor;
            comissaoRegiao[reg] += comissao;
            qtdRegiao[reg]++;
        }

        if (tipoCli == 'PF') valorPF += valor;
        if (tipoCli == 'PJ') valorPJ += valor;
        
        somaComissoes += comissao;

        if (vendVenda[codVend] == undefined) {
            vendVenda[codVend] = 0;
            vendComissao[codVend] = 0;
        }
        vendVenda[codVend] += valor;
        vendComissao[codVend] += comissao;

        let resp = prompt("Continuar? (S/N)");
        if (resp == 'N' || resp == 'n') continuar = false;
    }

    let maiorVenda = 0, vendMaiorVenda = "";
    let maiorComissao = 0, vendMaiorComissao = "";
    let bateuMeta = 0;

    for (let v in vendVenda) {
        let val = vendVenda[v];
        let com = vendComissao[v];

        if (val >= meta) bateuMeta++;
        if (val > maiorVenda) { maiorVenda = val; vendMaiorVenda = v; }
        if (com > maiorComissao) { maiorComissao = com; vendMaiorComissao = v; }
    }

    let relatorio = "--- RELATÓRIO EX 6 ---\n";
    relatorio += "Total vendas: " + totalVendas + "\n";
    relatorio += "Valor por Região -> 1: " + valorRegiao[1].toFixed(2) + " | 2: " + valorRegiao[2].toFixed(2) + " | 3: " + valorRegiao[3].toFixed(2) + " | 4: " + valorRegiao[4].toFixed(2) + "\n";
    relatorio += "Valor Cliente -> PF: " + valorPF.toFixed(2) + " | PJ: " + valorPJ.toFixed(2) + "\n";
    relatorio += "Maior venda: Vendedor " + vendMaiorVenda + " (R$ " + maiorVenda.toFixed(2) + ")\n";
    relatorio += "Maior comissão: Vendedor " + vendMaiorComissao + " (R$ " + maiorComissao.toFixed(2) + ")\n";
    relatorio += "Bateram a meta: " + bateuMeta + "\n";
    relatorio += "Comissão média geral: R$ " + (totalVendas>0?somaComissoes/totalVendas:0).toFixed(2) + "\n";
    relatorio += "Comissão média por Região (por venda):\n";
    relatorio += "1: " + (qtdRegiao[1]?comissaoRegiao[1]/qtdRegiao[1]:0).toFixed(2) + " | 2: " + (qtdRegiao[2]?comissaoRegiao[2]/qtdRegiao[2]:0).toFixed(2) + " | 3: " + (qtdRegiao[3]?comissaoRegiao[3]/qtdRegiao[3]:0).toFixed(2) + " | 4: " + (qtdRegiao[4]?comissaoRegiao[4]/qtdRegiao[4]:0).toFixed(2);

    alert(relatorio);
}