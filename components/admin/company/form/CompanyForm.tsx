"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanySchema } from "@/schemas";
import { Company } from "@/types";
import { REVENUE_OPTIONS } from "@/utils/constants";
import { useCompanyData } from "@/hooks/useCompanyData";
import { saveCompany } from "@/services/companies/basicCompanyActions";
import {
  generateSlug,
  handleInputNullableFieldChange,
  transformToNull,
  transformToUndefined,
} from "@/utils/helpers";
import { useSuccessToast, useErrorToast } from "@/hooks/useToasts";
import { Form } from "@/components/ui/form";
import FormFieldWrapper from "@/components/shared/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import BasicFormSkeleton from "@/components/shared/BasicFormSkeleton";
import ErrorAlert from "@/components/shared/ErrorAlert";

const FIELDS = [
  "name",
  "slug",
  "website",
  "yearFounded",
  "numberOfEmployees",
  "estimatedRevenue",
] as (keyof Company)[];

const NUMBER_OF_FIELDS = FIELDS.length;

const REVENUE_OPTIONS_FOR_SELECT = REVENUE_OPTIONS.map((option) => ({
  key: option,
  value: option,
}));

/**
 * Props for the `CompanyForm` component.
 *
 * @property {string} [companyId] - The optional ID of the company to fetch and edit.
 * If not provided, the form will be initialized for creating a new company.
 */
type CompanyFormProps = {
  companyId?: string;
};

/**
 * A React component that renders a form for creating or editing a company.
 * The form supports validation, data fetching, and submission, while handling
 * missing values by transforming them to `null`.
 *
 * @param {CompanyFormProps} props - The properties for the component, including an optional `companyId` for fetching and editing an existing company.
 * @returns {JSX.Element} A JSX element that renders the company form, including fields for name, slug, website, year founded, number of employees, and estimated revenue.
 */
export default function CompanyForm({ companyId }: CompanyFormProps) {
  const {
    data: companyData,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
  } = useCompanyData(companyId, FIELDS);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof CompanySchema>>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: "",
      slug: "",
      website: null,
      yearFounded: null,
      numberOfEmployees: null,
      estimatedRevenue: null,
    },
  });
  const { control, handleSubmit, setValue, reset } = form;

  useEffect(() => {
    if (companyData) {
      const transformedData = transformToNull(companyData, FIELDS);
      reset(transformedData);
    }
  }, [companyData, reset]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setValue("name", name);
    setValue("slug", generateSlug(name));
  }

  async function onSubmit(data: z.infer<typeof CompanySchema>) {
    setIsSubmitting(true);
    try {
      const transformedData = transformToUndefined(data) as Company;
      await saveCompany(transformedData, companyId);
      showSuccessToast(
        `Successfully ${companyId ? "updated" : "created"} company!`
      );
      if (companyId) return;
      router.push("/admin/company/form");
      reset();
    } catch (error) {
      showErrorToast();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="font-semibold text-2xl mb-16">Add Company</div>
      {isCompanyLoading ? (
        <BasicFormSkeleton numberOfFields={NUMBER_OF_FIELDS} />
      ) : isCompanyError ? (
        <ErrorAlert />
      ) : (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormFieldWrapper
              name="name"
              control={control}
              label="Name"
              onChange={handleNameChange}
            />
            <FormFieldWrapper name="slug" control={control} label="Slug" />
            <FormFieldWrapper
              name="website"
              control={control}
              label="Website"
              onChange={handleInputNullableFieldChange()}
            />
            <FormFieldWrapper
              name="yearFounded"
              control={control}
              label="Year Founded"
              onChange={handleInputNullableFieldChange((v) => parseInt(v, 10))}
              type="number"
            />
            <FormFieldWrapper
              name="numberOfEmployees"
              control={control}
              label="Number of Employees"
              onChange={handleInputNullableFieldChange((v) => parseInt(v, 10))}
              type="number"
            />
            <FormFieldWrapper
              name="estimatedRevenue"
              control={control}
              label="Estimated Revenue"
              type="select"
              options={REVENUE_OPTIONS_FOR_SELECT}
            />
            <Button
              type="submit"
              className="text-normal"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Please wait..."
                : companyId
                ? "Update Company"
                : "Add Company"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
