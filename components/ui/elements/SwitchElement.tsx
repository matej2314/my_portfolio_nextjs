import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SwitchElementProps {
    // Basic props
    id?: string;
    name?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;

    // Label and description
    label?: string;
    description?: string;

    // States
    disabled?: boolean;
    loading?: boolean;

    // Validation
    error?: string;

    // Styling
    className?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;

    // Layout
    labelPosition?: 'left' | 'right' | 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg';

    // Other props
    required?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
}

const sizeClasses = {
    sm: 'h-3 w-6',
    md: 'h-[1.15rem] w-8',
    lg: 'h-5 w-10'
};

const thumbSizeClasses = {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-5'
};

export const SwitchElement = React.forwardRef<HTMLButtonElement, SwitchElementProps>(
    (
        {
            id,
            name,
            checked,
            defaultChecked,
            onCheckedChange,
            label,
            description,
            disabled = false,
            loading = false,
            error,
            className,
            labelClassName,
            descriptionClassName,
            errorClassName,
            labelPosition = 'left',
            size = 'md',
            required = false,
            'aria-label': ariaLabel,
            'aria-describedby': ariaDescribedby,
            ...props
        },
        ref
    ) => {
        const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
        const descriptionId = description ? `${switchId}-description` : undefined;
        const errorId = error ? `${switchId}-error` : undefined;

        const isDisabled = disabled || loading;

        const renderLabel = () => {
            if (!label) return null;

            return (
                <Label
                    htmlFor={switchId}
                    className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        labelClassName
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>
            );
        };

        const renderDescription = () => {
            if (!description) return null;

            return (
                <p
                    id={descriptionId}
                    className={cn(
                        "text-sm text-muted-foreground",
                        descriptionClassName
                    )}
                >
                    {description}
                </p>
            );
        };

        const renderError = () => {
            if (!error) return null;

            return (
                <p
                    id={errorId}
                    className={cn(
                        "text-sm text-destructive",
                        errorClassName
                    )}
                >
                    {error}
                </p>
            );
        };

        const renderSwitch = () => (
            <Switch
                ref={ref}
                id={switchId}
                name={name}
                checked={checked}
                defaultChecked={defaultChecked}
                onCheckedChange={onCheckedChange}
                disabled={isDisabled}
                className={cn(
                    sizeClasses[size],
                    className
                )}
                aria-label={ariaLabel || label}
                aria-describedby={cn(descriptionId, errorId)}
                {...props}
            >
                <div
                    className={cn(
                        "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
                        thumbSizeClasses[size]
                    )}
                />
            </Switch>
        );

        const renderContent = () => {
            switch (labelPosition) {
                case 'right':
                    return (
                        <>
                            {renderSwitch()}
                            <div className="flex flex-col gap-1">
                                {renderLabel()}
                                {renderDescription()}
                            </div>
                        </>
                    );
                case 'top':
                    return (
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                {renderLabel()}
                                {renderDescription()}
                            </div>
                            {renderSwitch()}
                        </div>
                    );
                case 'bottom':
                    return (
                        <div className="flex flex-col gap-2">
                            {renderSwitch()}
                            <div className="flex flex-col gap-1">
                                {renderLabel()}
                                {renderDescription()}
                            </div>
                        </div>
                    );
                default: // left
                    return (
                        <>
                            <div className="flex flex-col gap-1">
                                {renderLabel()}
                                {renderDescription()}
                            </div>
                            {renderSwitch()}
                        </>
                    );
            }
        };

        return (
            <div className="flex items-center gap-3">
                {renderContent()}
                {renderError()}
            </div>
        );
    }
);

SwitchElement.displayName = "SwitchElement";