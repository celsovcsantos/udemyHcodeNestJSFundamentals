export function validaCpf(cpf: string): string {
  cpf = extrairNumeros(cpf);

  // Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
    return 'CPF inválido. Favor verificar.';

  // String para Array
  const cpfArray = cpf.split('');

  const validator = cpfArray
    // Pegar os últimos 2 digitos de validação
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    // Transformar digitos em números
    .map((el) => +el);

  const toValidate = (pop: number) =>
    cpfArray
      // Pegar Array de items para validar
      .filter((digit, index, array) => index < array.length - pop && digit)
      // Transformar digitos em números
      .map((el) => +el);

  const rest = (count: number, pop: number) =>
    ((toValidate(pop)
      // Calcular Soma dos digitos e multiplicar por 10
      .reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      // Pegar o resto por 11
      11) %
    // transformar de 10 para 0
    10;

  const resultado = !(
    rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]
  );
  if (resultado === false) return 'CPF inválido. Favor verificar.';
  return 'OK';
}

export function validaCnpj(cnpj: string): string {
  // Remove qualquer formatação do CNPJ (pontos, traços e barras)
  // cnpj = cnpj.replace(/[^\d]/g, '')
  cnpj = extrairNumeros(cnpj);
  // console.log(cnpj);
  // const regex = /^\d+$/;
  // if (regex.test(cnpj) === false) {
  //   return 'O CNPJ informado possui dígitos inválidos. Favor verificar.';
  // }

  // Verifica se o CNPJ possui 14 dígitos
  if (cnpj.length !== 14) {
    return 'O CNPJ informado não possui 14 dígitos. Favor verificar.';
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i), 10) * peso;
    peso--;
    if (peso < 2) {
      peso = 9;
    }
  }
  let digito1 = 11 - (soma % 11);
  if (digito1 >= 10) {
    digito1 = 0;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i), 10) * peso;
    peso--;
    if (peso < 2) {
      peso = 9;
    }
  }
  let digito2 = 11 - (soma % 11);
  if (digito2 >= 10) {
    digito2 = 0;
  }

  // Verifica se os dígitos calculados são iguais aos dígitos originais
  if (
    parseInt(cnpj.charAt(12), 10) === digito1 &&
    parseInt(cnpj.charAt(13), 10) === digito2
  ) {
    // console.log('OK');
    return 'OK';
  } else {
    return 'O CNPJ informado é inválido. Favor verificar';
  }
}

export function extrairNumeros(input: string): string {
  // Use uma expressão regular para encontrar todos os dígitos numéricos
  // console.log(extrairNumeros);
  input = input.replace(/[^\d]+/g, '');
  //console.log(input);
  const digitos = input.match(/\d/g);
  //console.log(digitos);

  // Verifique se digitos não é nulo (ou seja, há dígitos numéricos)
  if (digitos !== null) {
    // Junte os dígitos encontrados em uma única string e retorne
    return digitos.join('');
  } else {
    // Caso não haja dígitos numéricos, retorne uma string vazia ou outra indicação de erro, se necessário
    return '';
  }
}

export function validaEmail(email: string): string {
  const ret = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
  if (ret === false) return 'O email informado é inválido. Favor verificar.';
  return 'OK';
}
export function fn_null(valor: string) {
  return valor ? `${valor.toString().replace(/'/g, "''")}` : '';
}

// export function validaSenha(senha: string): string {
//   if (senha.length < 8 || senha.length > 20) {
//     return 'A senha deve conter entre 8 e 20 dígitos. Favor verificar.';
//   }

//   if (!/[a-z]/.test(senha)) {
//     return 'A senha deve conter ao menos 1 caracter minúsculo. Favor verificar.';
//   }

//   if (!/[A-Z]/.test(senha)) {
//     return 'A senha deve conter ao menos 1 caracter maiúsculo. Favor verificar.';
//   }

//   if (!/\d/.test(senha)) {
//     return 'A senha deve conter ao menos 1 número. Favor verificar.';
//   }

//   if (!/[@$!%*?&]/.test(senha)) {
//     return 'A senha deve conter ao menos 1 caracter especial. Favor verificar.';
//   }

//   return 'OK';
// }
