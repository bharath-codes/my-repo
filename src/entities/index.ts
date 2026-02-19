/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: applications
 * Interface for Applications
 */
export interface Applications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  candidateName?: string;
  /** @wixFieldType url */
  resume?: string;
  /** @wixFieldType text */
  jobReference?: string;
  /** @wixFieldType text */
  applicationStatus?: string;
  /** @wixFieldType number */
  matchScore?: number;
  /** @wixFieldType text */
  strengths?: string;
  /** @wixFieldType text */
  missingSkills?: string;
}


/**
 * Collection ID: interviewquestions
 * Interface for InterviewQuestions
 */
export interface InterviewQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  applicationReference?: string;
  /** @wixFieldType text */
  candidateName?: string;
  /** @wixFieldType text */
  technicalQuestions?: string;
  /** @wixFieldType text */
  behavioralQuestions?: string;
  /** @wixFieldType text */
  scenarioQuestions?: string;
  /** @wixFieldType datetime */
  generatedDate?: Date | string;
}


/**
 * Collection ID: jobs
 * Interface for JobListings
 */
export interface JobListings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  jobDescription?: string;
  /** @wixFieldType text */
  requiredSkills?: string;
  /** @wixFieldType text */
  experienceLevel?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType text */
  jobLocation?: string;
}
