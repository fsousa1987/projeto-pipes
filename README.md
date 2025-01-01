### **Projeto utilizando Pipes, Filtros e Organização de Projeto no Angular**

---

### **Objetivo**

O projeto apresenta a solução onde:

- Uma tabela exibe informações de operações financeiras (nome, status, data, valor, risco).
- As informações são processadas e formatadas com **pipes**.
- Um **filtro dinâmico** é implementado para buscar operações pela propriedade `Customer Name`.
- Boas práticas de organização e padronização de projeto são aplicadas.

---

### **Estrutura do Projeto**

1. **Mocks**:

- Simula a resposta de uma chamada HTTP antes de integrar com o backend.
- Criado em `mocks/operations-list-response.mock.ts`.
- Representa uma lista de operações com propriedades como `CustomerName`, `CustomerStatus`, etc.

2. **Interfaces e Types**:

- **Interface**: Define a estrutura de cada operação (`OperationResponse`).
- **Type**: Representa a lista de operações (`OperationsListResponse`), tipando como array da interface.

3. **Service**:

- Simula um service HTTP usando o **RxJS** para retornar os dados do mock em formato de `Observable`.

4. **Pipes**:

- Pipes nativos (ex.: `date`, `currency`, `percent`) e personalizados foram utilizados:
  - `StatusPipe`: Converte o status numérico (1 ou 2) em strings "Ativo" ou "Inativo".
  - `StatusIconPipe`: Retorna o caminho do ícone correspondente ao status.
  - `FilterPipe`: Filtra a lista de operações com base em uma propriedade e valor.

5. **Data Binding**:

- `Two-way data binding` com o `ngModel` para capturar o valor do input de pesquisa.

---

### **Etapas da Implementação**

#### **1. Mock e Tipagem**

- Criar o mock representando os dados simulados de uma API.
- Criar a interface e o tipo para estruturar os dados.

```typescript
// Interface
export interface IOperationResponse {
  CustomerName: string;
  CustomerStatus: number;
  OperationDate: string;
  OperationValue: number;
  OperationRisk: number;
}

// Mock
export const OperationsListResponseMock: IOperationResponse[] = [
  {CustomerName: 'João', CustomerStatus: 1, OperationDate: '2024-12-27T12:30:00Z', OperationValue: 500, OperationRisk: 0.4},
  // Outras operações
];
```

#### **2. Service**

- Criar um serviço Angular com o decorator `@Injectable` para injeção de dependência.
- Retornar o mock como um `Observable`.

```typescript

@Injectable({providedIn: 'root'})
export class OperationsService {
  getOperations(): Observable<IOperationResponse[]> {
    return of(OperationsListResponseMock);
  }
}
```

---

#### **3. Pipes Personalizados**

##### **3.1. `StatusPipe`**

- Converte o status numérico em texto.

```typescript

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(userStatus: number): string {
    const statusList = {1: 'Ativo', 2: 'Inativo'};
    return statusList[userStatus] || 'Desconhecido';
  }
}
```

##### **3.2. `StatusIconPipe`**

- Retorna o caminho do ícone correspondente ao status.

```typescript

@Pipe({name: 'statusIcon'})
export class StatusIconPipe implements PipeTransform {
  transform(userStatus: number): string {
    const iconList = {
      1: 'assets/icons/active-icon.png',
      2: 'assets/icons/inactive-icon.png'
    };
    return iconList[userStatus];
  }
}
```

##### **3.3. `FilterPipe`**

- Filtra a lista de operações com base em uma propriedade (`CustomerName`) e valor.

```typescript

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform<T>(list: T[], searchProp: string, searchValue: string): T[] {
    if (!list.length || !searchValue) return list;
    return list.filter(item =>
      item[searchProp]?.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
```

---

#### **4. Data Binding**

- Usar `ngFor` com `FilterPipe` para exibir a lista de operações dinamicamente.
- Capturar o valor do input com `ngModel`.

```html
<input [(ngModel)]="searchTerm" placeholder="Pesquisar..."/>
<tr *ngFor="let operation of operationsList | filter:'CustomerName':searchTerm">
  <td>{{ operation.CustomerName }}</td>
  <td>{{ operation.CustomerStatus | status }}</td>
  <td><img [src]="operation.CustomerStatus | statusIcon"/></td>
</tr>
```

---

#### **5. Configurações Globais**

- Configurar o `localID` para usar formatações brasileiras (`pt-BR`) com `currency`, `date`, e `percent`.

```typescript
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class AppModule {
}
```

---

### **Resumo dos Conceitos Aplicados**

1. **Organização do Projeto**:

- Pastas para `pipes`, `services`, `types`, e `mocks`.
- Boas práticas de nomenclatura e padronização.

2. **Pipes**:

- Uso de pipes para formatação e filtros (personalizados e nativos).

3. **Data Binding**:

- Uso de `ngFor` para renderização dinâmica.
- `Two-way data binding` com `ngModel`.

4. **Performance**:

- Evitar métodos diretos no HTML para melhorar a performance.

5. **Configurações Globais**:

- Configuração de localização com `LOCALE_ID`.

---

### **Conclusão**

Foi demonstrado um exemplo prático e completo de como construir um recurso no Angular utilizando **pipes, serviços, binding e boas práticas** de organização. Essa abordagem prepara a aplicação para cenários reais, como integração com APIs, garantindo escalabilidade e manutenção facilitada. 🚀
