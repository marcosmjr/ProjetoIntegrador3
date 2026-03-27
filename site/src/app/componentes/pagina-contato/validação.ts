export class Validacao{

    validaEmail(e_mail: string): boolean {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(e_mail);
        }

    validaTelefone(telefone: string): boolean{
        let numeroDigitos: number = 0
        const regex1 = /([1-9])+([1-9])+([1-9])+([0-9])+([0-9])+([0-9])+([0-9])+([0-9])+([0-9])+([0-9])/;
        const regex2 = /([1-9])+([1-9])+([1-9])+([0-9])+([0-9])+([0-9])+([0-9])+([0-9])+([0-9])+([0-9])+([0-9])/
        numeroDigitos = telefone.length;
        
        if(regex1.test(telefone) || regex2.test(telefone)){
            if(numeroDigitos <= 11 && numeroDigitos >= 10){
                return true
            }
        }
        return false;
    }
}