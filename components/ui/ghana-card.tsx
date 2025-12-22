import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Country data: [name, iso3, flag]
const allowedCountries = [
  { name: "Ghana", iso3: "GHA", flag: "🇬🇭" },
  { name: "Nigeria", iso3: "NGA", flag: "🇳🇬" },
] as const;

type CountryIso3 = "GHA" | "NGA";

export interface IDCardInputProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: string;
  onChange?: (idCard: string) => void;
  defaultCountry?: CountryIso3;
  disabled?: boolean;
}

const IDCardInput = React.forwardRef<HTMLDivElement, IDCardInputProps>(
  (
    { className, onChange, value, defaultCountry = "GHA", disabled, ...props },
    ref
  ) => {
    // Parse existing value
    const parseValue = (val?: string) => {
      if (!val) return { iso3: defaultCountry, prefix: "", postfix: "" };
      const parts = val.split("-");
      return {
        iso3: (parts[0] || defaultCountry) as CountryIso3,
        prefix: parts[1] || "",
        postfix: parts[2] || "",
      };
    };

    const [country, setCountry] = React.useState<CountryIso3>(
      parseValue(value).iso3
    );
    const [prefix, setPrefix] = React.useState(parseValue(value).prefix);
    const [postfix, setPostfix] = React.useState(parseValue(value).postfix);

    // Update parent when values change
    React.useEffect(() => {
      const idCard = `${country}-${prefix}-${postfix}`;
      onChange?.(idCard);
    }, [country, prefix, postfix, onChange]);

    const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, ""); // Only numbers
      if (val.length <= 9) {
        setPrefix(val);
      }
    };

    const handlePostfixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.toUpperCase();
      if (val.length <= 1) {
        setPostfix(val);
      }
    };

    const handleCopyPasteCut = (e: React.ClipboardEvent) => {
      e.preventDefault();
    };

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        <CountrySelect
          value={country}
          onChange={setCountry}
          disabled={disabled}
        />

        <div className="flex items-center gap-2 flex-1 rounded-e-lg border border-l-0 border-input bg-background px-3 py-3.5  text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          {/* Country ISO3 */}
          <span className="text-sm font-medium text-muted-foreground">
            {country}
          </span>

          <span className="text-muted-foreground">-</span>

          {/* Prefix (8-9 digits) */}
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="XXXXXXXX"
            value={prefix}
            onChange={handlePrefixChange}
            onCopy={handleCopyPasteCut}
            onPaste={handleCopyPasteCut}
            onCut={handleCopyPasteCut}
            disabled={disabled}
            className="border-0 shadow-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 w-24"
          />

          <span className="text-muted-foreground">-</span>

          {/* Postfix (1 character) */}
          <Input
            type="text"
            placeholder="X"
            value={postfix}
            onChange={handlePostfixChange}
            onCopy={handleCopyPasteCut}
            onPaste={handleCopyPasteCut}
            onCut={handleCopyPasteCut}
            disabled={disabled}
            maxLength={1}
            className="border-0 shadow-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 w-6 text-center"
          />
        </div>
      </div>
    );
  }
);
IDCardInput.displayName = "IDCardInput";

type CountrySelectProps = {
  disabled?: boolean;
  value: CountryIso3;
  onChange: (country: CountryIso3) => void;
};

const CountrySelect = ({ disabled, value, onChange }: CountrySelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedCountry = allowedCountries.find((c) => c.iso3 === value);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-2  rounded-e-none rounded-s-lg border-r-0 py-6 px-3 focus:z-10"
          disabled={disabled}
        >
          <span className="text-2xl">{selectedCountry?.flag}</span>
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {allowedCountries.map((country) => (
                <CountrySelectOption
                  key={country.iso3}
                  country={country}
                  selectedCountry={value}
                  onChange={onChange}
                  onSelectComplete={() => setIsOpen(false)}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps {
  country: (typeof allowedCountries)[number];
  selectedCountry: CountryIso3;
  onChange: (country: CountryIso3) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country.iso3);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <span className="text-2xl">{country.flag}</span>
      <span className="flex-1 text-sm">{country.name}</span>
      <span className="text-sm text-muted-foreground">{country.iso3}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country.iso3 === selectedCountry ? "opacity-100" : "opacity-0"
        }`}
      />
    </CommandItem>
  );
};

export { IDCardInput };
