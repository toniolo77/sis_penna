var React = require('react');
import Select from 'react-select';
require("../../styles/select.scss");

class SelectChosen extends React.Component {
	constructor(props) {
      super(props);

	  	if (props.defaultVal){
			this.setValor(props.defaultVal);
		}
		else {
			if(props.data.length>0){
				//Si es la primera opción y quiero dejar seteado el primero por defecto sin poder dejar el select vacío
				if(props.clearable != undefined  && !props.clearable && (props.defaultVal == undefined || props.defaultVal == "") ){
					let valor=props.data[0][props.llave];
					this.setValor(valor);

				}
				else{
		  			this.state = {value:''};
					props.valor({value:''});
				}
			}
			else{
				if (props.clearable!=undefined)//en caso que el arreglo de datos este vacio y se necesite cargar un valor
					this.state = {value:'',inicializado:false};
				else
					this.state = {value:''};
				props.valor({value:''});
			}
		}
    }

	//Al actualizar las opciones verifica si el estado esta en dicha opciones
	componentWillReceiveProps(props){
		this.inicializarEstado(props);//Se inicializa el esta en caso que no  lo esté
		let state= this.state;
		let esta=true;
		if ( this.state.value!="" && this.state.value.value!=undefined){
			esta=false;
			props.data.forEach(function(opt) {
				if (opt[props.llave]==state.value.value){
					esta=true;
				}
			});
		}

		if (!esta){
			this.setState({ value:"" });
			props.valor({value:''});
		}

		// this.validate(this.props.validator,this.state.value);

	}

	/**
	 * Setea el valor del chosen enviandolo al componente que lo utiliza con la funcion valor y realiza la validación
	 * @param {[type]} valor [description]
	 */
	setValor(valor){
		this.state = {value:valor};
		this.props.valor({value:valor});
		this.validate(this.props.validator,valor);
	}

	//Inicializa el estado en caso de que todavia no lo esté
	inicializarEstado(props){
		if (this.state.inicializado==false && props.data.length>0){
			let valor= props.data[0][props.llave]
			this.state = {value:valor, inicializado:true};
			props.valor({value:valor});
			this.validate(this.props.validator,valor);
		}
	}

	armarOptions(data,llave,descripcion){
		var newArray=[];
		data.map(function(opt,index) {
			newArray.push(
				{
					value:opt[llave],
					label:opt[descripcion]
				});
		});
		return newArray;
	}

	validate(validator,value){
        if(validator.required &&  (value==null || value.length==0)){
            this.props.cambiar(Object.assign({},validator, {isValid : false, msg : "El campo no puede quedar vacío"}));
            return;
        }
        this.props.cambiar(Object.assign({}, validator, {isValid : true, msg : ""}));
    }

	onChange(val) {
		val= (val==null)? {value:''} : val;
		this.setValor(val.value);
		if(this.props.onChange)
			this.props.onChange(val);
	}

	//Utilizado para validar en caso que ingrese manualmente la busqueda
	onBlur(event){
		if (event.target.value!="" && event.target.value.length>0){
			this.props.cambiar(Object.assign({},this.props.validator, {isValid : false, msg : "El campo no puede quedar vacío"}));
		}
	}

	render() {
	 const isValid    = (this.props.validator.isValid == undefined) ? false : this.props.validator.isValid;
	 const styleLabel = (isValid) ? 'hidden': '';
	 const styleInput = (isValid || this.props.validator.msg == undefined) ? '': 'invalid';
	 const clases = (this.props.clases== undefined) ? "" : this.props.clases;
	  return (
		 <div className={'form-group ' + clases}>
			<label>{this.props.label}</label>
			<Select
			  name           = "form-field-name"
			  placeholder    = "Seleccione una opción"
			  noResultsText  = "No existen opciones"
			  options        = {this.armarOptions(this.props.data,this.props.llave,this.props.descripcion)}
			  onChange       = {this.onChange.bind(this)}
			  value          = {this.state.value}
			  className      = ''
			  multi          = {this.props.multi}
			  clearValueText = 'Borrar'
			  clearAllText   = 'Borrar todo'
			  clearable      = {this.props.clearable}
			  onBlur         = {this.onBlur.bind(this)}
			/>
			<span className={"msj_error " +styleLabel}> {this.props.validator.msg}</span>
		</div>
	  );
	}
}

export default SelectChosen;
