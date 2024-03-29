import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon/icon';
import classNames from 'classnames'

type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    disabled?: boolean;
    size?: InputSize;
    icon?: IconDefinition;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
  const cnames = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={cnames} style={style} data-testid="test" >
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  )
}

export default Input;