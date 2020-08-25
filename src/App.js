import React, { Component } from 'react';
import './App.css';

// Autor Hiago Diniz
// 25-08-2020
// primeira aplicação com React

class App extends Component {
    constructor(props){
        super(props);

        this.state={
            newItem:"",
            listPessoal:[],
            listTrabalho:[],
            pessoal: true,
            trabalho: false
        }
    }

    // função que atualiza o valor vindo do input
    updateInput(key, value) {
       this.setState({
           [key]: value
       });
    }
    // função que adiciona um item em sua respectivel lista
    addItem(){
        var newItem={
            id: 1 + Math.random(),
            value: this.state.newItem.slice(),
            type: 'pessoal'
        };

        if (this.state.pessoal) {
            const listPessoal = [...this.state.listPessoal];

            listPessoal.push(newItem);

            this.setState({
                listPessoal,
                newItem:""
            });
        }
        else {
            const listTrabalho = [...this.state.listTrabalho];

            newItem.type = 'trabalho';

            listTrabalho.push(newItem);

            this.setState({
                listTrabalho,
                newItem:""
            });
        }
    }
    // deleta um item de sua respectivel lista
    deleteItem(item) {
        var id = item.id;

        if (item.type === 'pessoal') {
            const list = [...this.state.listPessoal];

            const updatedList = list.filter(item => item.id !== id);

            this.setState({listPessoal: updatedList});
        }
        else {
            const list = [...this.state.listTrabalho];

            const updatedList = list.filter(item => item.id !== id);

            this.setState({listTrabalho: updatedList});
        }        
    }
    // muda um item de uma lista para a outra
    changeItem(item) {
        var type = (item.type === 'pessoal' ? 'trabalho' : 'pessoal');
        var id = item.id;


        var newItem={
            id: 1 + Math.random(),
            value: document.getElementById(id).getElementsByTagName("textarea")[0].value,
            type: type
        };

        const listP = [...this.state.listPessoal];
        const listT = [...this.state.listTrabalho];

        var updatedListP = listP;
        var updatedListT = listT;

        if (type === 'pessoal') {
            if (newItem.type !== 'trabalho') { updatedListP.push(newItem); }
        }
        else {
            if (newItem.type !== 'pessoal') { updatedListT.push(newItem); }
        }

        updatedListP = updatedListP.filter(item => item.id !== id);
        updatedListT = updatedListT.filter(item => item.id !== id);

        this.setState({listPessoal: updatedListP});
        this.setState({listTrabalho: updatedListT});
    }
    // muda o tipo de lista selecionada
    changeGeneralType(atual) {
        document.getElementById(atual).classList.remove('active');

        if (this.state.pessoal) {
            this.setState({pessoal: false, trabalho: true});
            atual = 'trabalho';
        }
        else {
            this.setState({pessoal: true, trabalho: false});
            atual = 'pessoal';
        }

        document.getElementById(atual).classList.add('active');
    }

    // permite o item ser adicionado a lista pela tecla enter
    inputEnter() {
        var input = document.getElementById("mainInput");

        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("addBtn").click();
            }
        });
    }

    render() {
        return(
            <div className="App">
                <div className="header">
                    myTodoList
                </div>
                    
                <h1>Bem vindo(a)</h1>

                <div className="container">
                    <div class="input-wrapper">
                        <input 
                            id="mainInput"
                            type="text" 
                            placeholder="Digite o que fazer..."
                            value={this.state.newItem}
                            maxLength="100"
                            onChange={e => this.updateInput("newItem", e.target.value)}
                            onLoad={() => this.inputEnter()}
                        />

                        <button id="addBtn" className="addButton"
                            onClick={() => this.addItem()}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>

                    <div className="content">
                        <div className="bloco">
                            <h2 id="pessoal" className={this.state.pessoal.toString()} 
                            onClick={() => this.changeGeneralType('pessoal')}>
                            <i class="fas fa-user-alt"></i> Pessoal</h2>

                            <div className="list">
                                <ul>
                                    {this.state.listPessoal.map(item => {
                                        return(
                                            <li key={item.id} id={item.id.toString()}>

                                                <textarea maxlength="100">
                                                    {item.value}
                                                </textarea>

                                                <span className="buttonWrapper">
                                                    <button className="deleteItem"
                                                    onClick={() => this.deleteItem(item)} 
                                                    >
                                                    <i className="far fa-trash-alt"></i>
                                                    </button>
                                                    <button className="changeType"
                                                    onClick={() => this.changeItem(item)} 
                                                    >
                                                    <i className="fas fa-exchange-alt"></i>
                                                    </button>
                                                </span>

                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="bloco">
                            <h2 id="trabalho" className={this.state.trabalho.toString()}
                            onClick={() => this.changeGeneralType('trabalho')}>
                            <i className="fas fa-user-tie"></i> Trabalho</h2>

                            <div className="list">
                                <ul>
                                    {this.state.listTrabalho.map(item => {
                                        return(
                                            <li key={item.id} id={item.id.toString()}>

                                                <textarea maxlength="100">
                                                    {item.value}
                                                </textarea>

                                                <span className="buttonWrapper">
                                                    <button className="deleteItem"
                                                    onClick={() => this.deleteItem(item)} 
                                                    >
                                                    <i className="far fa-trash-alt"></i>
                                                    </button>
                                                    <button className="changeType"
                                                    onClick={() => this.changeItem(item)} 
                                                    >
                                                    <i className="fas fa-exchange-alt"></i>
                                                    </button>
                                                </span>

                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
