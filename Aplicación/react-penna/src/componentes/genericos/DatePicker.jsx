var React = require('react');
var DateP = require("react-bootstrap-date-picker");

class DatePicker extends React.Component {
    constructor(props) {
        super();
        this.state= {
            value : "",
            dayLabels : ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            monthLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        }
        props.valor({value : ""});

    }

    validate(validator,value){
        if(validator.required &&  (value==null || value.length==0)){
            this.props.cambiar(Object.assign({},validator, {isValid : false, msg : "El campo no puede quedar vacío"}));
            return;
        }
        this.props.cambiar(Object.assign({}, validator, {isValid : true, msg : ""}));
    }


    handleChange (value, formattedValue) {
        this.validate(this.props.validator,formattedValue);
        this.setState({
	      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
	      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
	    });
        this.props.valor({value : formattedValue});

	}


    render() {
      let isValid = (this.props.validator.isValid == undefined) ? false : this.props.validator.isValid;
      const styleLabel =  (isValid) ?  'hidden' :  '';
      const styleInput =  (isValid || this.props.validator.msg == undefined) ?  '' :  'invalid';
	  return (
        <div className={"form-group " +this.props.clases}>
            <label>{this.props.label}</label>
            <DateP
                id="example-datepicker"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                dayLabels={this.state.dayLabels}
                monthLabels={this.state.monthLabels}
                className= {"zIndez0 " +this.props.clases}
            />
            <span className={"msj_error " +styleLabel}> {this.props.validator.msg}</span>
        </div>
      )
    }
}

export default DatePicker;
