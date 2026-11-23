import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function Alert({ children, type = 'error', onClose }) 
{
  if (!children) return null;

  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;
  return
   <div className={`alert ${type}`} role="alert">
    <Icon size={17}/><span>{children}</span>{onClose && 
    <button type="button" onClick={onClose} aria-label="Close message"><X size={15}/>
    </button>}</div>;
}
